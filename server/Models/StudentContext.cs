using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options) {}
        public DbSet<Student> Student { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().ToTable("SINHVIEN").HasKey(e => e.MSSV);
        }
    }
}
