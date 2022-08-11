using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using dinamik_yatirim_seniorCase.Data;
using dinamik_yatirim_seniorCase.Models;
using Newtonsoft.Json;

namespace dinamik_yatirim_seniorCase.Controllers
{
    public class WordsController : Controller
    {
        private readonly AppDbContext _context;

        public WordsController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();


        }
        [HttpPost]
        public string AjaxMethod()
        {
            IEnumerable<Word> words = (from word in _context.Words
                                        select word).ToList();
            var result = JsonConvert.SerializeObject(new {data= words});
            return result;
        }

    }
}
