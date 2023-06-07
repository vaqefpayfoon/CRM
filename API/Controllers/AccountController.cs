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
        public IAccountRepository _repo { get; }
        public AccountController(IAccountRepository context)
        {
            _repo = context;
        }
    
        [HttpPost]
        public async Task<ActionResult<UserInfoDto>> Register(RegisterDto user)
        {
            return await _repo.Register(user);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserInfoDto>> Login(LoginDto info)
        {
            return await _repo.Login(info.UserName, info.Password);
        }
        [HttpGet]
        public ActionResult<string> Message()
        {
            return Ok("khiar saladi");
        }
    }
}