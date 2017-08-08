﻿using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Caching.Memory;
using PhantomTesting.Models;

namespace PhantomTesting.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMemoryCache _cacheService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public HomeController(IMemoryCache cache, IHostingEnvironment hostingEnvironment)
        {
            _cacheService = cache;
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index([FromServices] INodeServices nodeServices)
        {
            var scripts = _cacheService.Get("scripts");
            return View(scripts);
        }

        public async Task<IActionResult> RunAllTests([FromServices] INodeServices nodeServices)
        {
            var result = await nodeServices.InvokeAsync<bool>("NodeScripts/RunTest.js", "test");
            


            return View();
        }

        public async Task<IActionResult> RunConcreteTest([FromServices] INodeServices nodeServices, string scriptName)
        {
            await nodeServices.InvokeAsync<bool>("NodeScripts/RunTest.js", scriptName);
            Dictionary<string, string> scripts = (Dictionary<string, string>) _cacheService.Get("scripts");

            var script = scripts[scriptName];

            string contentRootPath = _hostingEnvironment.ContentRootPath + "/regression-tests" +
                                     Regex.Match(script, "xunit=(.*)").Groups[1];

            XmlSerializer ser = new XmlSerializer(typeof(testsuites));
            testsuites ts;
            using (XmlReader reader = XmlReader.Create(contentRootPath))
            {
                ts = (testsuites)ser.Deserialize(reader);
            }

            var testResult = new TestResultModel
            {
                TestSuiteErrors = ts.testsuite.errors,
                TestSuiteName = ts.testsuite.name,
                TestSuiteRunTime = ts.time,
                Tests = ts.testsuite.tests,
                TestSuiteFailures = ts.testsuite.failures,
                TimeStamp = ts.testsuite.timestamp,
                TestCases = new List<TestCase>()
            };

            foreach (var tc in ts.testsuite.testcase)
            {
                var testCase = new TestCase
                {
                    ClassName = tc.classname,
                    Failure = tc.failure.Value,
                    Name = tc.name,
                    TestCaseRunTime = tc.time
                };
                testCase.FailureImageUrl = GetFailureImageUrl(testCase);
                testCase.ExpectedImageUrl = GetExpectedImageUrl(testCase);
                testResult.TestCases.Add(testCase);                
            }

            return View(testResult);
        }

        private string GetFailureImageUrl(TestCase tc) 
        {
            string imagePath = string.Empty;

            if (tc.Failure.Contains("Looks different"))
            {
                imagePath = tc.Failure.Split(')')[1].Trim();
                imagePath = Regex.Match(imagePath, "regression-tests(.*)").Groups[1].Value;
            }
            else
            {
                return imagePath;
            }

            return "\\tests" + imagePath;
        }

        private string GetExpectedImageUrl(TestCase tc)
        {
            string imagePath = string.Empty;

            if (tc.Name.Contains("Should look the same"))
            {
                imagePath = tc.Name.Substring(tc.Name.IndexOf("Should look the same")).Trim();
                imagePath = Regex.Match(imagePath, "regression-tests(.*)").Groups[1].Value;
            }
            else
            {
                return imagePath;
            }

            return "\\tests" + imagePath;
        }


        public IActionResult Error()
        {
            return View();
        }
    }
}

