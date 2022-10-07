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
using Microsoft.CodeAnalysis.CSharp.Syntax;
using learningPortal.Data.Migrations;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace learningPortal.Controllers
{
    public class UserCoursesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserCoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Lecturer")]
        public async Task<IActionResult> Index()
        {
           
            List<UserCourse> userCourse = await _context.UserCourse.Include(uc => uc.Course).Include(uc => uc.AppUser).ToListAsync();
              return View(userCourse);
        }
        public async Task<IActionResult> UserCourseIsAction(int? id, string isAction)
        {
            if (id == null || _context.UserCourse == null)
            {
                return NotFound();
            }

            var userCourse = await _context.UserCourse
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userCourse == null)
            {
                return NotFound();
            }

            if(isAction == "accepted")
            {
                userCourse.IsAccepted = !(userCourse.IsAccepted);
                
            }

            _context.Update(userCourse);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        // GET: UserCourses/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.UserCourse == null)
            {
                return NotFound();
            }

            var userCourse = await _context.UserCourse
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userCourse == null)
            {
                return NotFound();
            }

            return View(userCourse);
        }

        // GET: UserCourses/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: UserCourses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IsRequested,IsAccepted,IsCompleted")] UserCourse userCourse)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userCourse);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(userCourse);
        }

        // GET: UserCourses/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.UserCourse == null)
            {
                return NotFound();
            }

            var userCourse = await _context.UserCourse.FindAsync(id);
            if (userCourse == null)
            {
                return NotFound();
            }
            return View(userCourse);
        }

        // POST: UserCourses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,IsRequested,IsAccepted,IsCompleted")] UserCourse userCourse)
        {
            if (id != userCourse.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userCourse);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserCourseExists(userCourse.Id))
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
            return View(userCourse);
        }

        // GET: UserCourses/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.UserCourse == null)
            {
                return NotFound();
            }

            var userCourse = await _context.UserCourse
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userCourse == null)
            {
                return NotFound();
            }

            return View(userCourse);
        }

        // POST: UserCourses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.UserCourse == null)
            {
                return Problem("Entity set 'ApplicationDbContext.UserCourse'  is null.");
            }
            var userCourse = await _context.UserCourse.FindAsync(id);
            if (userCourse != null)
            {
                _context.UserCourse.Remove(userCourse);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserCourseExists(int id)
        {
          return _context.UserCourse.Any(e => e.Id == id);
        }
    }
}
