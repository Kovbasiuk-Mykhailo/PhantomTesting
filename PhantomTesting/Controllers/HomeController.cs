using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Caching.Memory;

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
            Dictionary<string, string> scripts = (Dictionary<string, string>)_cacheService.Get("scripts");

            var script = scripts[scriptName];

            string contentRootPath = _hostingEnvironment.ContentRootPath + "/regression-tests" + Regex.Match(script, "xunit=(.*)").Groups[1];
            string fileContent = System.IO.File.ReadAllText(contentRootPath);

            XDocument resultDoc = XDocument.Parse(fileContent);

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
