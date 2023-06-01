using Application.Dtos.AppUser;
using Domain.Entities;

namespace Infrastructure.Interfaces
{
    public interface IAccountRepository
    {
         Task<UserInfoDto> Register(RegisterDto user);
         Task<UserInfoDto> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}