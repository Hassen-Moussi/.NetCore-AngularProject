using CoreBackend.DataBase;
using CoreBackend.Models;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CoreBackend.Services
{
    public interface IUserService
    {
        List<User> GetUsers();
        string Authenticate(string email, string password);
        User RegisterUser(User newUser);
        User ModifyUser (User user);
        string DeleteUser(int id);
    }
    public class UserService : IUserService
    {

        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }




        public List<User> GetUsers()
        {
            var users = _context.Users.ToList();
            if (users.Count > 0 )
            {
                return users; 
            }
            return null; 
        }

        public string Authenticate(string email, string password)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == email && x.Password == password);
            if (user == null) return null;

            // Generate JWT token for the authenticated user
            return GenerateJwtToken(user.Email);
        }

        private string GenerateJwtToken(string email)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Email, email)
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public User RegisterUser(User user)
        {
         
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
         
        }

        public User ModifyUser(User user )
        {
            User user1 = _context.Users.FirstOrDefault(x => x.Id == user.Id);
            {
                user1.Name = user.Name;
                user1.Email = user.Email;
                user1.Password = user.Password;
            }

            _context.SaveChanges();
            return user1;
        }

        public string DeleteUser (int id)
        {
            User user1 = _context.Users.FirstOrDefault(x => x.Id == id);

            if (user1 == null)
            {
                return "user doesn't exist ";
            }else
            {
                _context.Users.Remove(user1);
                _context.SaveChanges();
                return "user deleted successfully";
            }
           
        }


    }
}
