using System.Text.Json.Serialization;

namespace BE_API.Models
{
    public class ExamQuestion
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int QuestionId { get; set; }

        // Navigation properties (nếu dùng EF Core)
        public Exam? Exam { get; set; }
        public Question? Question { get; set; }
    }

}
