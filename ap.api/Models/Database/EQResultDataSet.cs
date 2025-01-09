namespace ap.api.Models.Database
{
    public class EQResultDataSet
    {
        public EQResultDataSet()
        {
            SUCCESS = true;
            MESSAGE = "OK";
            TABLES = 1;
            EQResult = new List<EQResult>();
        }
        public bool SUCCESS { get; set; }
        public string MESSAGE { get; set; }
        public int TABLES { get; set; }
        public List<EQResult> EQResult { get; set; }

    }
}
