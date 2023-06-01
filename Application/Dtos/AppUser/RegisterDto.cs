using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.Dtos.AppUser
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public List<Photo> Photos { get; set; } = new();
    }
}