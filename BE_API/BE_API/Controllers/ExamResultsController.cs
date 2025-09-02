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
        public async Task<ActionResult<IEnumerable<ExamResultDto>>> GetExamResults()
        {
            var results = await _context.ExamResults
                .Include(er => er.Exam)
                .Include(er => er.User)
                .Select(er => new ExamResultDto
                {
                    Id = er.Id,
                    ExamId = er.ExamId,
                    ExamName = er.Exam.Name,
                    UserId = er.UserId,
                    UserName = er.User.FullName,
                    TotalScore = er.TotalScore,
                    CreatedAt = er.CreatedAt
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
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
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
                CreatedAt = examResult.CreatedAt
            };

            return Ok(resultDto);
        }
    }
}
