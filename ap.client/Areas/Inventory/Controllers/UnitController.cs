namespace ap.client.Areas.Inventory.Controllers
{
    [Area("Inventory")]
    public class UnitController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
