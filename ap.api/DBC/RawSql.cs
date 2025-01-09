namespace ap.api.DBC
{
    public class RawSql
    {
        public EQResult ExecuteSqlSp(string conStr, string sp_name, string table_name, Dictionary<string, object> in_parameters)
        {
            var result = new EQResult();
            result.NAME = table_name;
            try
            {
                using (var connection = new SqlConnection(conStr))
                {
                    using (var command = new SqlCommand(sp_name, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        // Add input parameters
                        if (in_parameters != null)
                        {
                            foreach (var param in in_parameters)
                            {
                                command.Parameters.AddWithValue("@" + param.Key, param.Value ?? DBNull.Value);
                            }
                        }

                        // Add the output parameter for P_SUCCESS,P_MSG
                        var successParameter = new SqlParameter("@P_SUCCESS", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        command.Parameters.Add(successParameter);
                        var messageParameter = new SqlParameter("@P_MSG", SqlDbType.NVarChar, 100)
                        {
                            Direction = ParameterDirection.Output
                        };
                        command.Parameters.Add(messageParameter);

                        // Open the connection
                        connection.Open();
                        // Execute the command
                        using (var reader = command.ExecuteReader())
                        {
                            var dataTable = new DataTable();
                            if (reader.HasRows)
                            {
                                // Read the result into a DataTable                              
                                dataTable.Load(reader);
                                result.DynamicData = dataTable;
                                result.ROWS = dataTable.Rows.Count;
                            }
                            else
                            {
                                result.DynamicData = dataTable;
                                result.ROWS = -1;
                            }
                        }
                        // Retrieve the output message
                        result.MESSAGE = messageParameter.Value?.ToString() ?? "OK";

                        // Mark as success, from SP
                        result.SUCCESS = Convert.ToBoolean(successParameter.Value) ? true : Convert.ToBoolean(successParameter.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle any exception and map to result
                result.SUCCESS = false;
                result.MESSAGE = ex.Message;
            }
            //convert whole object to JSON
            //result.DynamicJson = JsonSerializeObject(result);
            return result;
        }

        private string JsonSerializeObject(dynamic result)
        {
            return JsonConvert.SerializeObject(result);
        }
        //private string JsonSerializeObject(object result)
        //{
        //    var options = new JsonSerializerOptions
        //    {
        //        WriteIndented = true, // For pretty-printing
        //        PropertyNamingPolicy = JsonNamingPolicy.CamelCase // For camelCase naming
        //    };
        //    return System.Text.Json.JsonSerializer.Serialize(result, options);
        //}

    }
}