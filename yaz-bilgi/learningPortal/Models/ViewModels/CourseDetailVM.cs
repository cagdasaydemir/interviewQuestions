namespace learningPortal.Models.ViewModels
{
    public class CourseDetailVM
    {
        public Course Course { get; set; }
        public Category Category { get; set; }
        public List<Category> Categories { get; set; }
    }
}
