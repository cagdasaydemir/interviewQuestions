namespace learningPortal.Models
{
    public class UserCourse
    {
        
        public int Id { get; set; }

        public Course Course { get; set; }
        public AppUser AppUser { get; set; }

        public Boolean IsRequested { get; set; } = false;
        public Boolean IsAccepted { get; set; } = false;
        public Boolean IsCompleted { get; set; } = false;
    }
}
