using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class UserCNTTContext : DbContext
    {
        public UserCNTTContext(DbContextOptions<UserCNTTContext> options) : base(options) { }
        public DbSet<User> UserCNTT { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("NGUOIDUNG").HasKey(e => e.username);
        }
    }
}
