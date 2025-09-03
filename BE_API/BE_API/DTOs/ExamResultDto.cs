namespace BE_API.DTOs
{
    public class ExamResultDto
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string ExamName { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public decimal TotalScore { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateExamResultDto
    {
        public int ExamId { get; set; }
        public int UserId { get; set; }
        public decimal TotalScore { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
