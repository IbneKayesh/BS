namespace ap.api.Models.API
{
    public class API_HEADER
    {
        /// <summary>
        /// User ID
        /// </summary>
        public string? USER_TOKEN { get; set; }
        /// <summary>
        /// User Key
        /// </summary>
        public string? SECRET_TOKEN { get; set; }

        /// <summary>
        /// App Token
        /// </summary>
        public string? APP_TOKEN { get; set; }

        /// <summary>
        /// Validation result
        /// </summary>
        public bool IS_VALID { get; set; } = false;
    }
}
