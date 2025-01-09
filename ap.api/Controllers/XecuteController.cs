namespace ap.api.Controllers
{
    [Route("api/Xecute")]
    [ApiController]
    public class XecuteController : ControllerBase
    {
        private readonly XecuteService _xecuteService;
        public XecuteController(XecuteService xecuteService)
        {
            _xecuteService = xecuteService;
        }
        [HttpPost("v1/Perform")]
        public IActionResult v1_Perform(List<WAPI_BODY> body)
        {
            try
            {
                if (body == null || body.Count == 0)
                {
                    return BadRequest("The request body parameters were not provided");
                }
                var apiData = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "apiData");
                if (!Directory.Exists(apiData))
                {
                    return BadRequest("The apiData configuration was not completed");
                }
                //find header
                API_HEADER appToken = RequestHeaders.FromHttpRequestHeaders(Request);
                if (!appToken.IS_VALID)
                {
                    return BadRequest(appToken.APP_TOKEN);
                }
                //app.json
                var appJSONfile = Path.Combine(apiData, "app.json");
                string appJSONcontent = System.IO.File.ReadAllText(appJSONfile);
                List<APP> AppList = JsonConvert.DeserializeObject<List<APP>>(appJSONcontent).Where(x => x.Id == appToken.APP_TOKEN).ToList();
                if (AppList.Count == 0)
                {
                    return BadRequest("Invalid app-token");
                }
                APP APP = AppList[0];

                EQResultDataSet retObj = new EQResultDataSet();
                foreach (var bodyItem in body)
                {
                    string[] resource = bodyItem.RESOURCE.Split('.');
                    if (resource.Length != 2)
                    {
                        return BadRequest("Invalid body RESOURCE");
                    }
                    List<Module> moduleList = APP.MODULE.Where(x => x.Name == bodyItem.RESOURCE.Split('.')[0]).ToList();
                    if (moduleList.Count == 0)
                    {
                        return BadRequest("Invalid body RESOURCE name");
                    }

                    //individual SQL
                    string sqlPath = APP.Data.Replace(".", "\\") + "\\" + moduleList[0].Path.Replace(".", "\\") + "\\" + bodyItem.RESOURCE.Split('.')[1] + ".json";
                    var sqlFile = Path.Combine(apiData, sqlPath);
                    if (!System.IO.File.Exists(sqlFile))
                    {
                        return BadRequest("The SQL does not exist");
                    }
                    string sqlContent = System.IO.File.ReadAllText(sqlFile);
                    SQL_FILE SQLFILE = JsonConvert.DeserializeObject<SQL_FILE>(sqlContent);

                    string[] dbCon = SQLFILE.DB.Split('.');
                    if (dbCon.Length != 2)
                    {
                        return BadRequest("Invalid DB and Connection");
                    }

                    //db.json
                    var dbJSONfile = Path.Combine(apiData, "db.json");
                    string dbJSONcontent = System.IO.File.ReadAllText(dbJSONfile);
                    List<DB> DbList = JsonConvert.DeserializeObject<List<DB>>(dbJSONcontent).Where(x => x.DB_TYPE == dbCon[0]).ToList();
                    if (DbList.Count == 0)
                    {
                        return BadRequest("The DB does not exist");
                    }
                    DB DB = DbList[0];
                    List<ConnectionString> connectionStringList = DB.ConnectionStrings.Where(x => x.NAME == dbCon[1]).ToList();
                    if (connectionStringList.Count == 0)
                    {
                        return BadRequest("The Connection String does not exist");
                    }
                    Dictionary<string, object> parameters = new Dictionary<string, object>();
                    foreach (var item in bodyItem.PARAMS)
                    {
                        parameters.Add(item.PARAM, item.VALUE);
                    }
                    EQResult queryResult = _xecuteService.Execute(parameters, SQLFILE.SQL, SQLFILE.NAME, connectionStringList[0].CONECTION);
                    if (queryResult.SUCCESS)
                    {
                        retObj.EQResult.Add(queryResult);
                    }
                    else
                    {
                        retObj.SUCCESS = false;
                        retObj.MESSAGE = queryResult.MESSAGE;
                    }
                }
                retObj.TABLES = body.Count;
                return Ok(JsonConvert.SerializeObject(retObj));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
