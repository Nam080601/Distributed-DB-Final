using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class ScoreContext : DbContext
    {
        public ScoreContext(DbContextOptions<ScoreContext> options) : base(options) { }
        public DbSet<Score> Score { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Score>().ToTable("DIEM").HasKey(e => new {e.MSSV, e.KHOA, e.MON});
        }
    }
}
