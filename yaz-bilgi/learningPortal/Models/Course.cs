using System.ComponentModel.DataAnnotations;

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

    }
}
