namespace ap.client.Areas.Inventory.Controllers
{
    [Area("Inventory")]
    public class CategoryController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
