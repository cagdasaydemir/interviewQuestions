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

        public DbSet<Course> Courses { get; set; }
        public DbSet<Category> Categories { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Online" },
                new Category { Id = 2, Name = "Kitap" },
                new Category { Id = 3, Name = "Sunum" },
                new Category { Id = 4, Name = "Makale" },
                new Category { Id = 5, Name = "Mini Proje" }
            );
        }
    }
}