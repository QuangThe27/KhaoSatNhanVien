using BE_API.Data;
using BE_API.DTOs;
using BE_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;

namespace BE_API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users
                .Include(u => u.Department) // lấy kèm thông tin phòng ban
                .ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Department)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] UserDto userDto)
        {
            var user = new User
            {
                FullName = userDto.FullName,
                Email = userDto.Email,
                Password = userDto.Password,
                Role = userDto.Role,
                Level = userDto.Level,
                DepartmentId = userDto.DepartmentId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportUsers(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Vui lòng chọn file Excel hợp lệ.");

            var users = new List<User>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var workbook = new XLWorkbook(stream))
                {
                    var worksheet = workbook.Worksheets.First();
                    var rows = worksheet.RangeUsed().RowsUsed().Skip(1); // Bỏ qua header

                    foreach (var row in rows)
                    {
                        var email = row.Cell(2).GetString();
                        // Kiểm tra email đã tồn tại
                        if (await _context.Users.AnyAsync(u => u.Email == email))
                            continue;

                        var user = new User
                        {
                            FullName = row.Cell(1).GetString(),
                            Email = email,
                            Password = row.Cell(3).GetString(),
                            Role = row.Cell(4).GetString(),
                            Level = row.Cell(5).GetString(),
                            DepartmentId = int.Parse(row.Cell(6).GetString()),
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now
                        };

                        users.Add(user);
                    }
                }
            }

            if (users.Count > 0)
            {
                _context.Users.AddRange(users);
                await _context.SaveChangesAsync();
            }

            return Ok(new { Message = $"Đã import {users.Count} người dùng thành công" });
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin
            user.FullName = userDto.FullName;
            user.Email = userDto.Email;
            user.Password = userDto.Password;
            user.Role = userDto.Role;
            user.Level = userDto.Level;
            user.DepartmentId = userDto.DepartmentId;
            user.UpdatedAt = DateTime.Now;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}