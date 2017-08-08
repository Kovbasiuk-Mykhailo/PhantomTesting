namespace PhantomTesting.Models
{
    [System.Xml.Serialization.XmlType(AnonymousType = true)]
    [System.Xml.Serialization.XmlRoot(Namespace = "", IsNullable = false)]
    public class testsuites
    {

        private testsuitesTestsuite testsuiteField;

        private decimal timeField;

        public testsuitesTestsuite testsuite
        {
            get => testsuiteField;
            set => testsuiteField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public decimal time
        {
            get => timeField;
            set => timeField = value;
        }
    }

    [System.Xml.Serialization.XmlType(AnonymousType = true)]
    public class testsuitesTestsuite
    {

        private testsuitesTestsuiteTestcase[] testcaseField;

        private string systemoutField;

        private string nameField;

        private byte testsField;

        private byte failuresField;

        private byte errorsField;

        private decimal timeField;

        private System.DateTime timestampField;

        private string packageField;

        [System.Xml.Serialization.XmlElement("testcase")]
        public testsuitesTestsuiteTestcase[] testcase
        {
            get => testcaseField;
            set => testcaseField = value;
        }

        [System.Xml.Serialization.XmlElement("system-out")]
        public string systemout
        {
            get => systemoutField;
            set => systemoutField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public string name
        {
            get => nameField;
            set => nameField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public byte tests
        {
            get => testsField;
            set => testsField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public byte failures
        {
            get => failuresField;
            set => failuresField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public byte errors
        {
            get => errorsField;
            set => errorsField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public decimal time
        {
            get => timeField;
            set => timeField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public System.DateTime timestamp
        {
            get => timestampField;
            set => timestampField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public string package
        {
            get => packageField;
            set => packageField = value;
        }
    }

    [System.Xml.Serialization.XmlType(AnonymousType = true)]
    public class testsuitesTestsuiteTestcase
    {

        private testsuitesTestsuiteTestcaseFailure failureField;

        private string nameField;

        private string classnameField;

        private decimal timeField;

        public testsuitesTestsuiteTestcaseFailure failure
        {
            get => failureField;
            set => failureField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public string name
        {
            get => nameField;
            set => nameField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public string classname
        {
            get => classnameField;
            set => classnameField = value;
        }

        [System.Xml.Serialization.XmlAttribute]
        public decimal time
        {
            get => timeField;
            set => timeField = value;
        }
    }

    [System.Xml.Serialization.XmlType(AnonymousType = true)]
    public class testsuitesTestsuiteTestcaseFailure
    {

        private string typeField;

        private string valueField;

        [System.Xml.Serialization.XmlAttribute]
        public string type
        {
            get => typeField;
            set => typeField = value;
        }

        [System.Xml.Serialization.XmlText]
        public string Value
        {
            get => valueField;
            set => valueField = value;
        }
    }
}
