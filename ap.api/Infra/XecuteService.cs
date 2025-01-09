using ap.api.DBC;
namespace ap.api.Infra
{
    public class XecuteService
    {
        private readonly RawSql _rawSql;
        public XecuteService(RawSql rawSql)
        {
            _rawSql = rawSql;
        }
        public EQResult Execute(Dictionary<string, object> parameters, string spName, string tableName, string connection)
        {
            return _rawSql.ExecuteSqlSp(connection, spName, tableName, parameters);
        }

    }
}
