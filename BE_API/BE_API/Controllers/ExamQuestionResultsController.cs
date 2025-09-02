using BE_API.Data;
using BE_API.DTOs;
using BE_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_API.Controllers
{
    [Route("api/dapan-baikiemtra")]
    [ApiController]
    public class ExamQuestionResultsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExamQuestionResultsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/dapan-baikiemtra
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamQuestionResultDto>>> GetAll()
        {
            var data = await _context.ExamQuestionResults
                .Include(r => r.Question)
                .Include(r => r.Answer)
                .Select(r => new ExamQuestionResultDto
                {
                    Id = r.Id,
                    ExamResultId = r.ExamResultId,
                    QuestionId = r.QuestionId,
                    QuestionContent = r.Question.Content,
                    QuestionType = r.Question.QuestionType,
                    AnswerId = r.AnswerId,
                    AnswerContent = r.Answer != null ? r.Answer.Content : null,
                    EssayAnswers = r.EssayAnswers,
                    Score = r.Score,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return Ok(data);
        }

        // POST: api/dapan-baikiemtra
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] List<CreateExamQuestionResultDto> dtos) // 👈 quan trọng
        {
            if (dtos == null || dtos.Count == 0)
                return BadRequest("Dữ liệu rỗng.");

            // Kiểm tra ExamResultId tồn tại
            var examResultId = dtos[0].ExamResultId;
            var exists = await _context.ExamResults.AnyAsync(x => x.Id == examResultId);
            if (!exists) return NotFound("ExamResult không tồn tại.");

            using var trx = await _context.Database.BeginTransactionAsync();
            try
            {
                foreach (var dto in dtos)
                {
                    if (dto.ExamResultId != examResultId)
                        return BadRequest("Tất cả bản ghi phải cùng ExamResultId.");

                    var entity = new ExamQuestionResult
                    {
                        ExamResultId = dto.ExamResultId,
                        QuestionId = dto.QuestionId,
                        AnswerId = dto.AnswerId,
                        EssayAnswers = dto.EssayAnswers,
                        Score = dto.Score,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    };
                    _context.ExamQuestionResults.Add(entity);
                }

                await _context.SaveChangesAsync();
                await trx.CommitAsync();
                return Ok(new { message = "Đã lưu kết quả chi tiết bài kiểm tra" });
            }
            catch (Exception ex)
            {
                await trx.RollbackAsync();
                return StatusCode(500, ex.Message);
            }
        }
    }
}
