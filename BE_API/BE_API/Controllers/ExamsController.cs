using BE_API.Data;
using BE_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_API.Controllers
{
    [Route("api/baikiemtra")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExamsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
        {
            return await _context.Exams.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var exam = await _context.Exams.FindAsync(id);
            return exam == null ? NotFound() : exam;
        }

        [HttpPost]
        public async Task<ActionResult<Exam>> CreateExam([FromBody] Exam exam)
        {
            _context.Exams.Add(exam);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetExam), new { id = exam.Id }, exam);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExam(int id, [FromBody] Exam updated)
        {
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null) return NotFound();

            exam.Name = updated.Name;
            exam.Description = updated.Description;
            exam.DurationMinutes = updated.DurationMinutes;
            exam.JobPosition = updated.JobPosition;
            exam.Level = updated.Level;
            exam.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(exam);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null) return NotFound();

            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
