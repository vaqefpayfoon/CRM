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
        private IAccountRepository _repo { get; }
        private ILogger<AccountController> _logger { get; }
        public AccountController(IAccountRepository context, ILogger<AccountController> logger)
        {
            _repo = context;
            _logger = logger;
        }
    
        [HttpPost]
        public async Task<ActionResult<UserInfoDto>> Register(RegisterDto user)
        {
            return await _repo.Register(user);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserInfoDto>> Login(LoginDto info)
        {
            _logger.LogInformation(info.UserName + "  " + info.Password);
            return await _repo.Login(info.UserName, info.Password);
        }
        [HttpGet]
        public ActionResult<string> Message()
        {
            _logger.LogInformation("khiar saladi");
            return Ok("khiar saladi");
        }
    }
}