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

        // GET: api/dapan-baikiemtra/examresult/{examResultId}
        [HttpGet("examresult/{examResultId}")]
        public async Task<ActionResult<IEnumerable<ExamQuestionResultDto>>> GetByExamResultId(int examResultId)
        {
            var data = await _context.ExamQuestionResults
                .Include(r => r.Question)
                .Include(r => r.Answer)
                .Where(r => r.ExamResultId == examResultId)
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
                    CreatedAt = r.CreatedAt,
                    MaxScore = r.Question.Score
                })
                .ToListAsync();

            return Ok(data);
        }

        // POST: api/dapan-baikiemtra
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] List<CreateExamQuestionResultDto> dtos)
        {
            if (dtos == null || dtos.Count == 0)
                return BadRequest("Dữ liệu rỗng.");

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

                // 👉 Tính tổng điểm và cập nhật ExamResult
                var totalScore = await _context.ExamQuestionResults
                    .Where(r => r.ExamResultId == examResultId)
                    .SumAsync(r => r.Score);

                var examResult = await _context.ExamResults.FindAsync(examResultId);
                if (examResult != null)
                {
                    examResult.TotalScore = totalScore;
                    examResult.UpdatedAt = DateTime.Now;
                    await _context.SaveChangesAsync();
                }

                await trx.CommitAsync();
                return Ok(new { message = "Đã lưu kết quả chi tiết bài kiểm tra và cập nhật tổng điểm" });
            }
            catch (Exception ex)
            {
                await trx.RollbackAsync();
                return StatusCode(500, ex.Message);
            }
        }

        // PUT: api/dapan-baikiemtra/{id}/score
        [HttpPut("{id}/score")]
        public async Task<IActionResult> UpdateScore(int id, [FromBody] decimal score)
        {
            var questionResult = await _context.ExamQuestionResults.FindAsync(id);
            if (questionResult == null) return NotFound("Không tìm thấy kết quả câu hỏi.");

            questionResult.Score = score;
            questionResult.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            // 👉 Cập nhật lại tổng điểm cho ExamResult
            var totalScore = await _context.ExamQuestionResults
                .Where(r => r.ExamResultId == questionResult.ExamResultId)
                .SumAsync(r => r.Score);

            var examResult = await _context.ExamResults.FindAsync(questionResult.ExamResultId);
            if (examResult != null)
            {
                examResult.TotalScore = totalScore;
                examResult.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Đã cập nhật điểm", newScore = score, totalScore });
        }

    }
}
