using System.ComponentModel.DataAnnotations;

namespace ap.api.Models.API
{
    public class WAPI_BODY
    {
        [Display(Name = "Resource")]
        [Required(ErrorMessage = "{0} is required")]
        public string? RESOURCE { get; set; }
        public List<WAPI_PARAMS>? PARAMS { get; set; }
    }
}
