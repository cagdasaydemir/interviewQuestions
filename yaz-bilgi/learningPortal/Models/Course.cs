using System.ComponentModel.DataAnnotations;

namespace learningPortal.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(250, ErrorMessage = "Please Enter Less Than 250 Characters")]
        public string Name { get; set; }
        [Required]
        [MaxLength(250, ErrorMessage = "Please Enter Less Than 1500 Characters")]
        public string Description { get; set; }
        [Required]
        public int Quota { get; set; }
        public double Price { get; set; }

    }
}
