namespace BE_API.DTOs
{
    public class ExamQuestionResultDto
    {
        public int Id { get; set; }
        public int ExamResultId { get; set; }
        public int QuestionId { get; set; }
        public string QuestionContent { get; set; }
        public string QuestionType { get; set; }
        public int? AnswerId { get; set; }
        public string? AnswerContent { get; set; }
        public string? EssayAnswers { get; set; }
        public decimal Score { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateExamQuestionResultDto
    {
        public int ExamResultId { get; set; }
        public int QuestionId { get; set; }
        public int? AnswerId { get; set; }
        public string? EssayAnswers { get; set; }
        public decimal Score { get; set; }
    }
}
