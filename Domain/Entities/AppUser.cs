using Domain.Extensions;

namespace Domain.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public List<Photo> Photos { get; set; } = new();
        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}