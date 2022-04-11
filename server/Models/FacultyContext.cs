using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Models
{
    public class FacultyContext : DbContext
    {
        public FacultyContext(DbContextOptions<FacultyContext> options) : base(options) {}
        public DbSet<server.Models.Faculty> Faculty { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Faculty>().ToTable("KHOA");
        }
    }
}
