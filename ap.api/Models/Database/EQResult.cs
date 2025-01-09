namespace ap.api.Models.Database
{
    public class EQResult
    {
        public bool SUCCESS { get; set; } = true;
        public string MESSAGE { get; set; } = "OK";
        public int ROWS { get; set; } = 0;
        public string NAME { get; set; } = "Table 1";
        public DataTable DynamicData { get; set; } = new DataTable();
    }
}
