using Microsoft.EntityFrameworkCore;
using BE_API.Models;

namespace BE_API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Department> Departments { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
