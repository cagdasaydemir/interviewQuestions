namespace learningPortal.Models
{
    public class CourseCategory
    {
        public int Id { get; set; }
  
        public Course Course { get; set; }
        public Category Category { get; set; }
    }
}
