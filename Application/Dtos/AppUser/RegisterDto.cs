using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.AppUser
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}