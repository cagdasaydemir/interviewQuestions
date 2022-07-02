using System.ComponentModel.DataAnnotations;

namespace dinamik_yatırım_seniorCase.Models
{
    public class Word
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Range(1,50,ErrorMessage ="Lütfen 1-50 arasında bir sayı giriniz !")]
        public int Length { get; set; }
        public string Text { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.Now;
    }
}
