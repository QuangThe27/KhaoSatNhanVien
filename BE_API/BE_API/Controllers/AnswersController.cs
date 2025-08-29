using BE_API.Data;
using BE_API.DTOs;
using BE_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_API.Controllers
{
    [Route("api/dapan-tracnghiem")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnswersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/dapan-tracnghiem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAllAnswers()
        {
            return await _context.Answers
                .Include(a => a.Question)
                .ToListAsync();
        }

        // GET: api/dapan-tracnghiem/question/5
        [HttpGet("question/{questionId}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswersByQuestionId(int questionId)
        {
            var answers = await _context.Answers
                .Where(a => a.QuestionId == questionId)
                .Include(a => a.Question)
                .ToListAsync();

            return answers;
        }

        // GET: api/dapan-tracnghiem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            var answer = await _context.Answers
                .Include(a => a.Question)
                .FirstOrDefaultAsync(a => a.Id == id);

            return answer == null ? NotFound() : answer;
        }

        // POST: api/dapan-tracnghiem
        [HttpPost]
        public async Task<ActionResult<Answer>> PostAnswer([FromBody] AnswerDto dto)
        {
            // Kiểm tra câu hỏi có tồn tại không
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == dto.QuestionId);
            if (question == null)
            {
                return NotFound(new { message = "Câu hỏi không tồn tại" });
            }

            // Kiểm tra loại câu hỏi có phải MultipleChoice không
            if (!string.Equals(question.QuestionType, "MultipleChoice", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { message = "Câu hỏi không phải dạng câu Trắc nghiệm" });
            }

            // Nếu IsCorrect = true, kiểm tra xem đã có đáp án đúng nào chưa
            if (dto.IsCorrect)
            {
                bool hasCorrect = await _context.Answers
                    .AnyAsync(a => a.QuestionId == dto.QuestionId && a.IsCorrect);

                if (hasCorrect)
                {
                    return BadRequest(new { message = "Câu hỏi này đã có đáp án đúng, không thể thêm thêm nữa" });
                }
            }

            var answer = new Answer
            {
                QuestionId = dto.QuestionId,
                Content = dto.Content,
                IsCorrect = dto.IsCorrect
            };

            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnswer), new { id = answer.Id }, answer);
        }

        // DELETE: api/dapan-tracnghiem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);
            if (answer == null) return NotFound();

            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
