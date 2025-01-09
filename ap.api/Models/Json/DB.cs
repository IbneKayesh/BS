namespace ap.api.Models.Json
{
    public class DB
    {
        public string DB_TYPE { get; set; }
        public List<ConnectionString> ConnectionStrings { get; set; }
    }

    public  class ConnectionString
    {
        public string NAME { get; set; }
        public string CONECTION { get; set; }
    }
}
