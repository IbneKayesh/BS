namespace ap.client.Services
{
    public static class RoutingExtension
    {
        public static IEndpointRouteBuilder AreaEndpointRouteBuilder(this IEndpointRouteBuilder endpointRoute)
        {

            endpointRoute.MapAreaControllerRoute(
                        name: "AreaCompany",
                        areaName: "Company",
                        pattern: "Company/{controller=Home}/{action=Index}/{id?}");

            return endpointRoute;
        }
    }
}
