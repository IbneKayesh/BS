namespace ap.api.Models.Json
{
    public class APP
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }
        public List<Module> MODULE { get; set; }
    }

    public class Module
    {
        public string Name { get; set; }
        public string Path { get; set; }
    }
}
