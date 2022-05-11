using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class ScoreCNTTContext : DbContext
    {
        public ScoreCNTTContext(DbContextOptions<ScoreCNTTContext> options) : base(options) { }
        public DbSet<Score> ScoreCNTT { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Score>().ToTable("DIEM").HasKey(e => new {e.MSSV, e.KHOA, e.MON});
        }
    }
}
