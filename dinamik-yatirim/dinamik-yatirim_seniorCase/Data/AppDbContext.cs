using dinamik_yatirim_seniorCase.Models;
using Microsoft.EntityFrameworkCore;

namespace dinamik_yatirim_seniorCase.Data
{
    public class AppDbContext :DbContext 
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Word> Words { get; set; }
    }
}
