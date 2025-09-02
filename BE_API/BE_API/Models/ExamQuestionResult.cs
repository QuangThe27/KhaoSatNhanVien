using System;

namespace BE_API.Models
{
    public class ExamQuestionResult
    {
        public int Id { get; set; }
        public int ExamResultId { get; set; }
        public int QuestionId { get; set; }
        public int? AnswerId { get; set; }
        public string? EssayAnswers { get; set; }
        public decimal Score { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public ExamResult? ExamResult { get; set; }
        public Question? Question { get; set; }
        public Answer? Answer { get; set; }
    }
}
