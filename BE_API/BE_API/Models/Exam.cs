namespace BE_API.Models
{
    public class Exam
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int DurationMinutes { get; set; }
        public string? JobPosition { get; set; }
        public string? Level { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
