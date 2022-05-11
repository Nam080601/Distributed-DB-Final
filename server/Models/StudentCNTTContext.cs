using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class StudentCNTTContext : DbContext
    {
        public StudentCNTTContext(DbContextOptions<StudentCNTTContext> options) : base(options) { }
        public DbSet<Student> StudentCNTT { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().ToTable("SINHVIEN").HasKey(e => e.MSSV);
        }
    }
}
