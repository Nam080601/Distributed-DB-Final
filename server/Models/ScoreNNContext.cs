using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class ScoreNNContext : DbContext
    {
        public ScoreNNContext(DbContextOptions<ScoreNNContext> options) : base(options) { }
        public DbSet<Score> ScoreNN { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Score>().ToTable("DIEM").HasKey(e => new {e.MSSV, e.KHOA, e.MON});
        }
    }
}
