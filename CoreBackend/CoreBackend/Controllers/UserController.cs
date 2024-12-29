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
        private readonly IVerificationService _verificationService;
        private readonly IEmailService _emailService;
        public UserController(IUserService userService , IConfiguration configuration , IVerificationService verificationService , IEmailService emailService)
        {
            _userService = userService;
            _configuration = configuration;
            _verificationService = verificationService;
            _emailService = emailService;
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
        public IActionResult Update(int id , string name)
        {
            if (id == null)
                return BadRequest("User doesn't exist");

            return Ok(_userService.ModifyUser(id, name));
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(int id)
        {
            return Ok(_userService.DeleteUser(id));
        }
        [HttpGet("GetById/{id}")]
        public User GetById( int id)
        {
            return _userService.GetUserById(id);
        }

        [HttpPost("request-verification-code")]
        public async Task<IActionResult> RequestVerificationCode(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required.");
            }

            // Generate verification code
            var verificationCode = _verificationService.GenerateVerificationCode(email);

            // Send the code via email
            var subject = "Email Update Verification Code";
            var message = $"Your verification code is: {verificationCode}";
            await _emailService.SendEmailAsync(email, subject, message);

            return Ok("Verification code sent.");
        }

        [HttpPost("verify-and-update-email")]
        public IActionResult VerifyAndUpdateEmail(string currentEmail, string newEmail, string code)
        {
            if (string.IsNullOrEmpty(currentEmail) || string.IsNullOrEmpty(newEmail) || string.IsNullOrEmpty(code))
            {
                return BadRequest("All fields are required.");
            }

            // Use currentEmail to validate the code
            if (_verificationService.ValidateVerificationCode(currentEmail, code))
            {
                _userService.ModifyEmail(currentEmail,newEmail);

                _verificationService.RemoveVerificationCode(currentEmail);  // Remove code after successful validation
                return Ok("Email updated successfully.");
            }

            return BadRequest("Invalid verification code.");
        }

    }
}

