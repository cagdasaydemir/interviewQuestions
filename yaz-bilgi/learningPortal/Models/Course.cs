using System.ComponentModel;
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
        [DisplayName("Start Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MMM/yyyy}")]
        public DateTime StartDate { get; set; }
        [DisplayName("End Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MMM/yyyy}")]
        public DateTime EndDate { get; set; }
        [DisplayName("Lecturer Position")]
        public LecturerEnum LecturerEnum { get; set; }
        [DisplayName("Course Files")]
        public List<CourseFile> CourseFiles { get; set; }

    }
}
