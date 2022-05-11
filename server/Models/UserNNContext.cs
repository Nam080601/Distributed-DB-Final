using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class UserNNContext : DbContext
    {
        public UserNNContext(DbContextOptions<UserNNContext> options) : base(options) { }
        public DbSet<User> UserNN { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("NGUOIDUNG").HasKey(e => e.username);
        }
    }
}
