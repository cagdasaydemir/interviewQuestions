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
        [MaxLength(250, ErrorMessage = "Please Enter Less Than 1500 Characters")]
        public string Description { get; set; }
        [Required]
        [Range(1, 50, ErrorMessage = "Quota must be between 1 and 50 only !")]
        public int Quota { get; set; }
        public double Price { get; set; }
        //public string Lecturer { get; set; }
       
        public LecturerEnum LecturerEnum { get; set; }
        public List<int> CategoryIds { get; set; } = new List<int>();
    }
}
