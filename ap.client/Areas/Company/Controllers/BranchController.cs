namespace ap.client.Areas.Company.Controllers
{
    [Area("Company")]
    public class BranchController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
