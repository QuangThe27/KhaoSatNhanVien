namespace BE_API.DTOs
{
    public class AnswerDto
    {
        public int QuestionId { get; set; }
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
    }
}
