using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class StudentNNContext : DbContext
    {
        public StudentNNContext(DbContextOptions<StudentNNContext> options) : base(options) { }
        public DbSet<Student> StudentNN { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().ToTable("SINHVIEN").HasKey(e => e.MSSV);
        }
    }
}
