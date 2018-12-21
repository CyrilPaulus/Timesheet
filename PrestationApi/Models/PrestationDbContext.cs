
using Microsoft.EntityFrameworkCore;

namespace PrestationApi.Models
{
    public class PrestationDbContext : DbContext
    {
        public DbSet<CodeChantier> CodesChantier { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Prestation> Prestations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=prestation.db");
        }
    }

}