using BE_API.Data;
using BE_API.DTOs;
using BE_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_API.Controllers
{
    [Route("api/ketqua-kiemtra")]
    [ApiController]
    public class ExamResultsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExamResultsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ketqua-kiemtra
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamResultDto>>> GetAllExamResults()
        {
            var results = await _context.ExamResults
                .Include(er => er.Exam)
                .Include(er => er.User)
                .OrderByDescending(er => er.CreatedAt)
                .Select(er => new ExamResultDto
                {
                    Id = er.Id,
                    ExamId = er.ExamId,
                    ExamName = er.Exam.Name,
                    UserId = er.UserId,
                    UserName = er.User.FullName,
                    TotalScore = er.TotalScore,
                    CreatedAt = er.CreatedAt,
                    UpdatedAt = er.UpdatedAt
                })
                .ToListAsync();

            return Ok(results);
        }

        // GET: api/ketqua-kiemtra/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ExamResultDto>>> GetExamResultsByUser(int userId)
        {
            var results = await _context.ExamResults
                .Include(er => er.Exam)
                .Include(er => er.User)
                .Where(er => er.UserId == userId)
                .OrderByDescending(er => er.CreatedAt)
                .Select(er => new ExamResultDto
                {
                    Id = er.Id,
                    ExamId = er.ExamId,
                    ExamName = er.Exam.Name,
                    UserId = er.UserId,
                    UserName = er.User.FullName,
                    TotalScore = er.TotalScore,
                    CreatedAt = er.CreatedAt,
                    UpdatedAt = er.UpdatedAt
                })
                .ToListAsync();

            return Ok(results);
        }

        // POST: api/ketqua-kiemtra
        [HttpPost]
        public async Task<ActionResult<ExamResultDto>> CreateExamResult(CreateExamResultDto dto)
        {
            var examResult = new ExamResult
            {
                ExamId = dto.ExamId,
                UserId = dto.UserId,
                TotalScore = dto.TotalScore,
                CreatedAt = dto.CreatedAt,
                UpdatedAt = dto.UpdatedAt
            };

            _context.ExamResults.Add(examResult);
            await _context.SaveChangesAsync();

            var resultDto = new ExamResultDto
            {
                Id = examResult.Id,
                ExamId = examResult.ExamId,
                ExamName = (await _context.Exams.FindAsync(examResult.ExamId))?.Name ?? "",
                UserId = examResult.UserId,
                UserName = (await _context.Users.FindAsync(examResult.UserId))?.FullName ?? "",
                TotalScore = examResult.TotalScore,
                CreatedAt = examResult.CreatedAt,
                UpdatedAt = examResult.UpdatedAt
            };

            return Ok(resultDto);
        }

        // DELETE: api/ketqua-kiemtra/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamResult(int id)
        {
            var examResult = await _context.ExamResults
                .Include(er => er.ExamQuestionResults) // nếu có quan hệ cần xóa kèm
                .FirstOrDefaultAsync(er => er.Id == id);

            if (examResult == null)
            {
                return NotFound();
            }

            // Xóa tất cả ExamQuestionResults liên quan
            _context.ExamQuestionResults.RemoveRange(examResult.ExamQuestionResults);

            _context.ExamResults.Remove(examResult);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
