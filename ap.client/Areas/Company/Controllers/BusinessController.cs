﻿namespace ap.client.Areas.Company.Controllers
{
    [Area("Company")]
    public class BusinessController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}