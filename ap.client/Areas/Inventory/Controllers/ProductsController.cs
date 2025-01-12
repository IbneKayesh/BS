namespace ap.client.Areas.Inventory.Controllers
{
    [Area("Inventory")]
    public class ProductsController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
