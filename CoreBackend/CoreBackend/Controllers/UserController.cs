using CoreBackend.Models;
using CoreBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {


        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        public UserController(IUserService userService , IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }
      

        [HttpGet]
        public List<User> GetUsersData()
        {
            return _userService.GetUsers(); 
            
        }

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] User userInput)
        {
            var newUser = _userService.RegisterUser(userInput);

            if (newUser == null)
                return BadRequest("Username already exists.");

            return Ok(new { Message = "User registered successfully!", newUser });
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel userInput)
        {
            var token = _userService.Authenticate(userInput.Email, userInput.Password);

            if (token == null)
                return Unauthorized("Invalid credentials");

            return Ok(new { Token = token });
        }


        [HttpPost("validate-token")]
        public IActionResult ValidateToken([FromBody] string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]))
            };

            try
            {
                var principal = handler.ValidateToken(token, validationParameters, out var securityToken);
                var jwtToken = (JwtSecurityToken)securityToken;
                var claims = jwtToken.Claims.ToList();

                return Ok(new
                {
                    Claims = claims.Select(c => new { c.Type, c.Value })
                });
            }
            catch (Exception ex)
            {
                return Unauthorized($"Token validation failed: {ex.Message}");
            }
        }


        [HttpPut("Update")]
        public IActionResult Update([FromBody] User userInput)
        {
            if (userInput == null)
                return BadRequest("User doesn't exist");

            return Ok(_userService.ModifyUser(userInput));
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(int id)
        {
            return Ok(_userService.DeleteUser(id));
        }
    }
}

