using System.ComponentModel.DataAnnotations;
using learningPortal.Models.Enums;

namespace learningPortal.Models
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quota { get; set; }
        public double Price { get; set; }
        public string Lecturer { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public LecturerEnum LecturerEnum { get; set; }
        public ICollection<CourseFile> CourseFiles { get; set; }

    }
}
