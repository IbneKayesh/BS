namespace ap.client.Areas.CRM.Controllers
{
    [Area("CRM")]
    public class ContactsController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
