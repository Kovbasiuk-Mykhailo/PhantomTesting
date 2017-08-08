using System;
using System.Collections.Generic;

namespace PhantomTesting.Models
{
    public class TestResultModel
    {
        public decimal TestSuiteRunTime { get; set; }
        public string TestSuiteName { get; set; }
        public int TestSuiteErrors { get; set; }
        public int TestSuiteFailures { get; set; }
        public int Tests { get; set; }
        public DateTime TimeStamp { get; set; }

        public List<TestCase> TestCases { get; set; }    
    }

    public class TestCase
    {
        public string ClassName { get; set; }
        public string Name { get; set; }
        public decimal TestCaseRunTime { get; set; }
        public string Failure { get; set; }
        public string ExpectedImageUrl { get; set; }
        public string FailureImageUrl { get; set; }
    } 
}
