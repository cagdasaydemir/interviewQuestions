namespace learningPortal.Models.ViewModels
{
    public class CourseCreateVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quota { get; set; }
        public double Price { get; set; }

        public List<int> CategoryIds { get; set; } = new List<int>();
    }
}
