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

namespace learningPortal.Controllers
{
    public class CoursesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Courses
        public async Task<IActionResult> Index()
        {
              return View(await _context.Courses.ToListAsync());
        }

        // GET: Courses/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Courses == null)
            {
                return NotFound();
            }
           

            var course = _context.Courses
                                    .Where(m => m.Id == id)
                                    .FirstOrDefault();

            var categories = _context.CourseCategory
                                .Where(cm => cm.Course.Id == id)
                                .Include(cm => cm.Category)
                                .Select(cm => cm.Category).ToList();

            CourseDetailVM courseDetailVM = new CourseDetailVM();

            courseDetailVM.Course = course;
            courseDetailVM.Categories = categories;
            if (course == null)
            {
                return NotFound();
            }

            return View(courseDetailVM);
        }

        // GET: Courses/Create
        public IActionResult Create()
        {
            CourseCreateVM createCourse = new CourseCreateVM();
            var categories = _context.Categories.ToList();
            ViewBag.Categories = categories;
            return View(createCourse);
            
        }

        // POST: Courses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateCourse( CourseCreateVM createCourse)
        {
            if (!ModelState.IsValid)
            {
                return View("Create");
            }
            else
            {
                Course course = new Course();
                course.Name = createCourse.Name;
                course.Description = createCourse.Description;
                course.Quota = createCourse.Quota;
                course.Price = createCourse.Price;

                //if (createCourse.ImgFile != null)
                //{
                //    var uniqueFileName = GetUniqueFileName(createCourse.ImgFile.FileName);
                //    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", uniqueFileName);
                //    createCourse.ImgFile.CopyTo(new FileStream(filePath, FileMode.Create));

                //    course.ImgUrl = uniqueFileName;
                //}

                _context.Courses.Add(course);

                createCourse.CategoryIds.ForEach(category =>
                {
                    CourseCategory courseCategory = new CourseCategory();
                    courseCategory.Course = course;
                    courseCategory.Category = _context.Categories.FirstOrDefault(c => c.Id == category);

                    _context.CourseCategory.Add(courseCategory);
                });
            }
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: Courses/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Courses == null)
            {
                return NotFound();
            }

            
            var categories = _context.Categories.ToList();
            ViewBag.Categories = categories;

            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            CourseCreateVM createCourse = new CourseCreateVM();

            createCourse.Name = course.Name;
            createCourse.Description = course.Description;
            createCourse.Quota = course.Quota;
            createCourse.Price = course.Price;
            
            return View(createCourse);
        }

        // POST: Courses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, CourseCreateVM createCourse)
        {
            if (id != createCourse.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {

                    if (createCourse.Id != 0)
                    {
                        var updatedCourse = _context.Courses
                                            .SingleOrDefault(m => m.Id == createCourse.Id);
                        updatedCourse.Name = createCourse.Name;
                        updatedCourse.Description = createCourse.Description;
                        updatedCourse.Quota = createCourse.Quota;
                        updatedCourse.Price = createCourse.Price;

                        var categoryLists = _context.CourseCategory
                            .Where(cm => cm.Course.Id == createCourse.Id)
                            .Select(cm => cm.Category.Id).ToList();

                        var deletedCategory = categoryLists.Except(createCourse.CategoryIds).ToList();

                        deletedCategory.ForEach(item =>
                        {
                            var deletedCourseCategory = _context.CourseCategory
                            .FirstOrDefault(c => c.Category.Id == item);
                            var delete = _context.CourseCategory.Remove(deletedCourseCategory);
                        });

                        _context.SaveChanges();
                        var addedCategory = createCourse.CategoryIds.Except(categoryLists).ToList();
                        addedCategory.ForEach(category =>
                        {
                            CourseCategory courseCategory = new CourseCategory();
                            courseCategory.Course = updatedCourse;
                            courseCategory.Category = _context.Categories
                            .FirstOrDefault(c => c.Id == category);

                            _context.CourseCategory.Add(courseCategory);
                        });

                        _context.Courses.Update(updatedCourse);
                        await _context.SaveChangesAsync();
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CourseExists(createCourse.Id))
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
            return View(createCourse);
        }

        // GET: Courses/Delete/5
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
