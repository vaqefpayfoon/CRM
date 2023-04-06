using System.Security.Cryptography;
using System.Text;
using Application.Dtos.AppUser;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseApiController
    {
        public DataContext _context { get; }
        private ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }
    
        [HttpPost]
        public async Task<ActionResult<AppUser>> Register(string username, string password)
        {
            var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPost("RegisterUser")]
        public async Task<ActionResult<UserInfoDto>> RegisterUser(RegisterDto info)
        {
            if (await UserExist(info.UserName)) return BadRequest("Duplicate User Found.");
            var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = info.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(info.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserInfoDto { Id = user.Id, UserName = user.UserName, Token = _tokenService.CreateToken(user) };
        }
        private async Task<bool> UserExist(string UserName)
        {
            return await _context.Users.AnyAsync(woak => woak.UserName.ToLower() == UserName.ToLower());
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserInfoDto>> Login(LoginDto info)
        {
            var user = await _context.Users.SingleOrDefaultAsync(woak => woak.UserName.ToLower().Equals(info.UserName.ToLower()));

            if (user == null) return Unauthorized("Invalid UserName");

            var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(info.Password));

            for (int i=0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid UserName");
            }

            return new UserInfoDto { Id = user.Id, UserName = user.UserName, Token = _tokenService.CreateToken(user) };

        }
        [HttpPut]
        public async Task<ActionResult<AppUser>> UpdateUser(int id, string username, string password)
        {
            var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = id,
                UserName = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}