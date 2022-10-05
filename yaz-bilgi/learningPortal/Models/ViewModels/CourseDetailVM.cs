namespace learningPortal.Models.ViewModels
{
    public class CourseDetailVM
    {
        public Course Course { get; set; }

        public Category Category { get; set; }

        public List<Category>? Categories { get; set; }

        public string userId { get; set; }
        public Boolean IsRequested { get; set; } = false;
        public Boolean IsAccepted { get; set; } = false;
        public Boolean IsCompleted { get; set; } = false;

    }
}
