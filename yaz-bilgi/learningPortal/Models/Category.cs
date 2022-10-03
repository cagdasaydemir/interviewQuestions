using System.ComponentModel.DataAnnotations;

namespace learningPortal.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        //Relationships
        public ICollection<CourseCategory> Courses { get; set; }
    }
}
