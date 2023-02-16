using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        private readonly DataContext _data;
        public UserController(DataContext data)
        {
            _data = data;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _data.Users.ToListAsync());
        }

        [HttpGet("{id}", Name = "GetById")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _data.Users.FindAsync(id);
        }

        [HttpGet("AllUsers")]
        public ActionResult<IEnumerable<AppUser>> AllUsers()
        {
            return _data.Users.ToList();
        }

        [HttpGet("FindUser/{id}", Name = "FindUser")]
        public ActionResult<AppUser> FindUser(int id)
        {
            return _data.Users.Find(id);
        }
    }
}