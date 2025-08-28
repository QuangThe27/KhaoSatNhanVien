namespace BE_API.DTOs
{
    public class ExamQuestionDto
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int QuestionId { get; set; }

        public ExamDto? Exam { get; set; }
        public QuestionDto? Question { get; set; }
    }

    public class ExamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string JobPosition { get; set; }
        public string Level { get; set; }
    }

    public class QuestionDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string QuestionType { get; set; }
        public decimal Score { get; set; }
    }

}
