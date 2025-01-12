using Microsoft.AspNetCore.Mvc;

namespace ap.client.Areas.OM.Controllers
{
    public class POSController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
