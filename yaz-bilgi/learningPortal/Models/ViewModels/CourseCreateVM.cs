using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using learningPortal.Models.Enums;

namespace learningPortal.Models.ViewModels
{
    public class CourseCreateVM
    {

      
        [Required]
        [MaxLength(250, ErrorMessage = "Please Enter Less Than 250 Characters")]
        public string Name { get; set; }
        [Required]
        [MaxLength(1500, ErrorMessage = "Please Enter Less Than 1500 Characters")]
        public string Description { get; set; }
        [Required]
        [Range(1, 50, ErrorMessage = "Quota must be between 1 and 50 only !")]
        public int Quota { get; set; }
        public double Price { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Please Enter Less Than 50 Characters")]
        [DisplayName("Lecturer Name")]
        public string Lecturer { get; set; }
        [Required]
        public LecturerEnum LecturerEnum { get; set; }
        [DisplayName("Course Files")]
        public List<IFormFile> Files { get; set; }
        [Required]
        [DisplayName("Start Date")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; } = DateTime.Now;
        [Required]
        [DisplayName("End Date")]
        [DataType(DataType.Date)]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime EndDate { get; set; } = DateTime.Now;
        [DisplayName("Categories")]
        public List<int> CategoryIds { get; set; } = new List<int>();
    }
}
