using System.ComponentModel.DataAnnotations;

namespace ap.api.Models.Database
{
    public class SQL_PARAMS
    {
        [Display(Name = "Database")]
        [Required(ErrorMessage = "{0} is required")]
        public string? DB { get; set; }

        [Display(Name = "Table Name")]
        [Required(ErrorMessage = "{0} is required")]
        public string? TABLE { get; set; }

        [Display(Name = "SQL")]
        [Required(ErrorMessage = "{0} is required")]
        public string? SQL { get; set; }

        public object[]? iPARAMS { get; set; }
        public object[]? oPARAMS { get; set; }
    }
}
