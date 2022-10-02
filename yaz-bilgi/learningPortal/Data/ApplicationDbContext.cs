using learningPortal.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace learningPortal.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "1", Name = "Student", NormalizedName = "STUDENT".ToUpper() });
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "2", Name = "Lecturer", NormalizedName = "LECTURER".ToUpper() });
        }
    }
}