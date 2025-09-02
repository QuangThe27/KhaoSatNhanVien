using System;

namespace BE_API.Models
{
    public class ExamResult
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int UserId { get; set; }
        public decimal TotalScore { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public Exam? Exam { get; set; }
        public User? User { get; set; }
    }
}
