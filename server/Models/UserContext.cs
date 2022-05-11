using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }
        public DbSet<User> User { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("NGUOIDUNG").HasKey(e => e.username);
        }
    }
}
