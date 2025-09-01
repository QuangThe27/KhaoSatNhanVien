using BE_API.Data;
using BE_API.Models;
using BE_API.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService;

        public AuthController(AppDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _context.Users
                .Include(u => u.Department)
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

            if (user == null)
            {
                return Unauthorized("Sai email hoặc mật khẩu");
            }

            // Trả về thông tin user (không trả password)
            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.Role,
                user.Level,
                user.DepartmentId,
                DepartmentName = user.Department?.Name,
                user.CreatedAt
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null) return NotFound("Email không tồn tại");

            var token = Guid.NewGuid().ToString("N").Substring(0, 6); // 6 ký tự
            user.Token = token;
            await _context.SaveChangesAsync();

            string body = $"Mã xác thực của bạn là: <b>{token}</b>";
            await _emailService.SendEmailAsync(user.Email, "Quên mật khẩu", body);

            return Ok("Mã xác thực đã được gửi về Email");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.Token == request.Token);
            if (user == null) return BadRequest("Email hoặc mã xác thực không đúng");

            user.Password = request.NewPassword; // ⚠️ Có thể băm mật khẩu tại đây
            user.Token = null;
            await _context.SaveChangesAsync();

            return Ok("Đổi mật khẩu thành công");
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
