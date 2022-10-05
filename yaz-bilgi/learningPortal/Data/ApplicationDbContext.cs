using learningPortal.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Reflection.Emit;

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
        public DbSet<CourseCategory> CourseCategory { get; set; }
        public DbSet<CourseFile> CourseFiles { get; set; }
        public DbSet<UserCourse> UserCourse { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

           
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "1", Name = "Student", NormalizedName = "STUDENT".ToUpper() },
                new IdentityRole { Id = "2", Name = "Lecturer", NormalizedName = "LECTURER".ToUpper() });



            builder.Entity<Category>().HasData(
               new Category { Id = 1, Name = "Online" },
               new Category { Id = 2, Name = "Kitap" },
               new Category { Id = 3, Name = "Sunum" },
               new Category { Id = 4, Name = "Makale" },
            new Category { Id = 5, Name = "Mini Proje" }
           );


            builder.Entity<Course>()
       .HasMany(c => c.CourseFiles)
       .WithOne(e => e.Course);
        }
    }
}