using Application.Dtos.AppUser;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private ILogger<AccountRepository> _logger { get; }
        public AccountRepository(DataContext context, ITokenService tokenService, ILogger<AccountRepository> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }
        public async Task<UserInfoDto> Login(string username, string password)
        {
            try
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName.ToLower() == username.ToLower());

                if (user == null)
                    return null;

                if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                    return null;

                return new UserInfoDto
                {
                    Id = user.Id,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName
                };
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return null;
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<UserInfoDto> Register(RegisterDto user)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(user.Password, out passwordHash, out passwordSalt);
            var newUser = new AppUser
            {
                Created = DateTime.Now,
                DateOfBirth = user.DateOfBirth,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                UserName = user.UserName,
                Photos = user.Photos
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return new UserInfoDto
            {
                Id = newUser.Id,
                Token = _tokenService.CreateToken(newUser),
                UserName = newUser.UserName
            };
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == username))
                return true;

            return false;
        }
    }
}