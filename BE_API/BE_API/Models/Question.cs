namespace BE_API.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string QuestionType { get; set; } // Essay / MultipleChoice
        public decimal Score { get; set; }
    }
}
