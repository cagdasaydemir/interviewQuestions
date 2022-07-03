using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using dinamik_yatirim_seniorCase.Data;
using dinamik_yatirim_seniorCase.Models;

namespace dinamik_yatirim_seniorCase.Controllers
{
    public class WordsController : Controller
    {
        private readonly AppDbContext _context;

        public WordsController(AppDbContext context)
        {
            _context = context;
        }

      
        public async Task<IActionResult> Index()
        {
              return _context.Words != null ? 
                          View(await _context.Words.ToListAsync()) :
                          Problem("Entity set 'AppDbContext.Words'  is null.");
           
        }
       

    }
}
