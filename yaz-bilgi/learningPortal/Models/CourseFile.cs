using System.ComponentModel.DataAnnotations;

namespace learningPortal.Models
{
    public class CourseFile
    {
        [Key]
        public int Id { get; set; }

        public string FileURL { get; set; }

        public Course Course { get; set; }
    }
}
