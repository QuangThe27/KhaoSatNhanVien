namespace BE_API.DTOs
{
    public class UserDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }   // admin, hr, manager, staff
        public string Level { get; set; }  // fresher, junior, middle, senior
        public int DepartmentId { get; set; }
    }
}
