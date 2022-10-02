using System.ComponentModel.DataAnnotations;

namespace learningPortal.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
