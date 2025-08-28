using BE_API.Data;
using BE_API.DTOs;
using BE_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_API.Controllers
{
    [Route("api/baikiemtra-cauhoi")]
    [ApiController]
    public class ExamQuestionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExamQuestionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/baikiemtra-cauhoi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamQuestionDto>>> GetExamQuestions()
        {
            var examQuestions = await _context.ExamQuestions
                .Include(eq => eq.Exam)
                .Include(eq => eq.Question)
                .Select(eq => new ExamQuestionDto
                {
                    Id = eq.Id,
                    ExamId = eq.ExamId,
                    QuestionId = eq.QuestionId,
                    Exam = eq.Exam == null ? null : new ExamDto
                    {
                        Id = eq.Exam.Id,
                        Name = eq.Exam.Name,
                        JobPosition = eq.Exam.JobPosition,
                        Level = eq.Exam.Level
                    },
                    Question = eq.Question == null ? null : new QuestionDto
                    {
                        Id = eq.Question.Id,
                        Content = eq.Question.Content,
                        QuestionType = eq.Question.QuestionType,
                        Score = eq.Question.Score
                    }
                })
                .ToListAsync();

            return Ok(examQuestions);
        }

        // GET: api/baikiemtra-cauhoi/by-exam/{examId}
        [HttpGet("by-exam/{examId}")]
        public async Task<ActionResult<IEnumerable<ExamQuestionDto>>> GetByExamId(int examId)
        {
            var examQuestions = await _context.ExamQuestions
                .Include(eq => eq.Question)
                .Where(eq => eq.ExamId == examId)
                .Select(eq => new ExamQuestionDto
                {
                    Id = eq.Id,
                    ExamId = eq.ExamId,
                    QuestionId = eq.QuestionId,
                    Question = eq.Question == null ? null : new QuestionDto
                    {
                        Id = eq.Question.Id,
                        Content = eq.Question.Content,
                        QuestionType = eq.Question.QuestionType,
                        Score = eq.Question.Score
                    }
                })
                .ToListAsync();

            return Ok(examQuestions);
        }

        // POST: api/baikiemtra-cauhoi/bulk
        [HttpPost("bulk")]
        public async Task<IActionResult> CreateExamQuestions([FromBody] CreateExamQuestionsRequest request)
        {
            if (request == null || request.QuestionIds == null || !request.QuestionIds.Any())
            {
                return BadRequest("Danh sách câu hỏi không hợp lệ.");
            }

            var examQuestions = request.QuestionIds.Select(qId => new ExamQuestion
            {
                ExamId = request.ExamId,
                QuestionId = qId
            }).ToList();

            _context.ExamQuestions.AddRange(examQuestions);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Thêm câu hỏi thành công" });
        }

        public class CreateExamQuestionsRequest
        {
            public int ExamId { get; set; }
            public List<int> QuestionIds { get; set; }
        }

        // DELETE: api/baikiemtra-cauhoi/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamQuestion(int id)
        {
            var examQuestion = await _context.ExamQuestions.FindAsync(id);
            if (examQuestion == null)
            {
                return NotFound();
            }

            _context.ExamQuestions.Remove(examQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
