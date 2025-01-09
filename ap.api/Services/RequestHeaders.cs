using ap.api.Models.API;
using System.Net.Http.Headers;

namespace ap.api.Services
{
    public class RequestHeaders
    {
        public static API_HEADER FromHttpRequestHeaders(HttpRequest headers)
        {
            API_HEADER requestHeaders = new API_HEADER();
            requestHeaders.IS_VALID = true;
            //validate app token
            if (headers.Headers.ContainsKey("app-token"))
            {
                requestHeaders.APP_TOKEN = headers.Headers["app-token"].First();
            }
            else
            {
                requestHeaders.APP_TOKEN = "Invalid app token";
                requestHeaders.IS_VALID = false;
                return requestHeaders;
            }
            return requestHeaders;
        }
    }
}
