using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using learningPortal.Data;
using learningPortal.Models;
using learningPortal.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace learningPortal.Controllers
{

    public class CoursesController : Controller
    {

        private UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [Authorize(Roles = "Lecturer, Student")]
        public async Task<IActionResult> MyCourses(string courseStatus)
        {
            System.Security.Claims.ClaimsPrincipal currentUser = this.User;
            var userId = _userManager.GetUserId(currentUser);
            List<Course> myCourses = new List<Course>();
            if (courseStatus == "IsAccepted")
            {
                ViewBag.CoursesTitle = "Accepted Courses";
                ViewBag.EmptyMessage = "You haven't enrolled to any courses yet !";
                myCourses = await _context.UserCourse.Where(uc => uc.AppUser.Id == userId).Where(uc => uc.IsAccepted == true).Include(uc => uc.Course).Include(uc => uc.Course.CourseFiles).Select(uc => uc.Course).ToListAsync();
            }
            else if (courseStatus == "IsCompleted")
            {
                ViewBag.CoursesTitle = "Completed Courses";
                ViewBag.EmptyMessage = "You haven't completed any courses yet !";
                myCourses = await _context.UserCourse.Where(uc => uc.AppUser.Id == userId).Where(uc => uc.IsCompleted == true).Include(uc => uc.Course).Include(uc => uc.Course.CourseFiles).Select(uc => uc.Course).ToListAsync();
            }
            else
            {
                ViewBag.CoursesTitle = "Requested Courses";
                ViewBag.EmptyMessage = "You haven't requested any courses yet !";
                myCourses = await _context.UserCourse.Where(uc => uc.AppUser.Id == userId).Where(uc => uc.IsRequested == true).Include(uc => uc.Course).Include(uc => uc.Course.CourseFiles).Select(uc => uc.Course).ToListAsync();
            }

            return View(myCourses);
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Courses.Include(uc => uc.CourseFiles).ToListAsync());
        }


        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Courses == null)
            {
                return NotFound();
            }

            var course = _context.Courses.Where(m => m.Id == id).FirstOrDefault();
            if (course == null)
            {
                return NotFound();
            }
            else
            {

                System.Security.Claims.ClaimsPrincipal currentUser = this.User;
                var userId = _userManager.GetUserId(currentUser);

                CourseDetailVM vm = new CourseDetailVM();
                vm.Course = course;
                vm.userId = userId;

                vm.IsRequested = await _context.UserCourse
                                .Where(uc => uc.Course.Id == id).Where(uc => uc.AppUser.Id == userId).Select(uc => uc.IsRequested).FirstOrDefaultAsync();
                vm.IsAccepted = await _context.UserCourse
                                .Where(uc => uc.Course.Id == id).Where(uc => uc.AppUser.Id == userId).Select(uc => uc.IsAccepted).FirstOrDefaultAsync();
                vm.IsCompleted = await _context.UserCourse .Where(uc => uc.Course.Id == id).Where(uc => uc.AppUser.Id == userId).Select(uc => uc.IsCompleted).FirstOrDefaultAsync();

                vm.Categories =  await _context.CourseCategory
                                .Where(cc => cc.Course.Id == id)
                                .Include(cc => cc.Category)
                                .Select(cc => cc.Category).ToListAsync();

                vm.Course.CourseFiles = await _context.CourseFiles
                                     .Where(cf => cf.Course.Id == id).ToListAsync();

                return View(vm);
            }
        }

        [Authorize(Roles = "Lecturer, Student")]
        [HttpPost]
        public async Task<IActionResult> DetailsIsAction(int? id, string IsAction)
        {
            System.Security.Claims.ClaimsPrincipal currentUser = this.User;
            var userId = _userManager.GetUserId(currentUser);

            UserCourse newUserCourse = new UserCourse();

            var existingUserCourse = await _context.UserCourse.Where(uc => uc.Course.Id == id).Where(uc => uc.AppUser.Id == userId).FirstOrDefaultAsync();
            if (existingUserCourse == null)
            {
                newUserCourse.IsRequested = true;
                newUserCourse.AppUser = await _userManager.FindByIdAsync(userId);
                newUserCourse.Course = await _context.Courses.FirstOrDefaultAsync(m => m.Id == id);

                await _context.UserCourse.AddAsync(newUserCourse);
            }
            else
            {
               
                if (IsAction == "requested")
                {
                    existingUserCourse.IsRequested = !(existingUserCourse.IsRequested);
                    _context.UserCourse.Update(existingUserCourse);
                }
                else
                    if (IsAction == "completed")
                {
                    existingUserCourse.IsCompleted = !(existingUserCourse.IsCompleted);
                    _context.UserCourse.Update(existingUserCourse);
                }
            }

            await _context.SaveChangesAsync();
            return RedirectToAction("Details", new { Id = id });
        }

        // GET: Courses/Create
        [Authorize(Roles = "Lecturer")]
        public IActionResult Create()
        {
            CourseCreateVM vm = new CourseCreateVM();
            var categories = _context.Categories.ToList();
            ViewBag.Categories = categories;

            return View(vm);
        }

        // POST: Courses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize(Roles = "Lecturer")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateCourse(CourseCreateVM vm)
        {
            Course course = new Course();
            course.Name = vm.Name;
            course.Description = vm.Description;
            course.Quota = vm.Quota;
            course.Price = vm.Price;
            course.LecturerEnum = vm.LecturerEnum;
            course.Lecturer = vm.Lecturer;
            course.StartDate = vm.StartDate;
            course.EndDate = vm.EndDate;

            if (vm.Files != null)
            {
                vm.Files.ForEach(file =>
                {
                    var uniqueFileName = GetUniqueFileName(file.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", uniqueFileName);
                    file.CopyTo(new FileStream(filePath, FileMode.Create));

                    CourseFile courseFile = new CourseFile();
                    courseFile.FileURL = filePath;
                    courseFile.Course = course;

                     _context.CourseFiles.AddAsync(courseFile);
                });

            }

            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();

            vm.CategoryIds.ForEach(category =>
            {
                CourseCategory courseCategory = new CourseCategory();
                courseCategory.Course = course;
                courseCategory.Category = _context.Categories.FirstOrDefault(c => c.Id == category);

                 _context.CourseCategory.AddAsync(courseCategory);

            });

            await _context.SaveChangesAsync();
            return RedirectToAction("Details", new { Id = course.Id });
        }
        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + Guid.NewGuid().ToString().Substring(0, 4)
                      + Path.GetExtension(fileName);
        }

        // GET: Courses/Edit/5
        [Authorize(Roles = "Lecturer")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Courses == null)
            {
                return NotFound();
            }

            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }

        // POST: Courses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize(Roles = "Lecturer")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,Quota,Price")] Course course)
        {
            if (id != course.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(course);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CourseExists(course.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(course);
        }

        // GET: Courses/Delete/5
        [Authorize(Roles = "Lecturer")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Courses == null)
            {
                return NotFound();
            }

            var course = await _context.Courses
                .FirstOrDefaultAsync(m => m.Id == id);
            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }

        // POST: Courses/Delete/5
        [Authorize(Roles = "Lecturer")]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Courses == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Courses'  is null.");
            }
            var course = await _context.Courses.FindAsync(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Id == id);
        }
    }
}
