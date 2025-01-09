using ap.client.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ap.client.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Buttons()
        {
            return View();
        }

        public IActionResult Inputs()
        {
            return View();
        }
        public IActionResult Tables()
        {
            return View();
        }
        public IActionResult Modal()
        {
            return View();
        }
        public IActionResult BusyBox()
        {
            return View();
        }
        
        public IActionResult TabbedPage()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
