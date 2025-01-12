namespace ap.client.Areas.SCM.Controllers
{
    [Area("SCM")]
    public class PurchaseController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
