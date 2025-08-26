using System;
using System.Text.Json.Serialization;

namespace BE_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }   // admin, hr, manager, staff
        public string Level { get; set; }  // fresher, junior, middle, senior
        public int DepartmentId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation property (liên kết với Department)
        public Department? Department { get; set; }
    }
}
