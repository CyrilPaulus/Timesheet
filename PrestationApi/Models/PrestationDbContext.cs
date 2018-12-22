
using Microsoft.EntityFrameworkCore;

namespace PrestationApi.Models
{
    public class PrestationDbContext : DbContext
    {
        public PrestationDbContext(DbContextOptions<PrestationDbContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<CodeChantier> CodesChantier { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Prestation> Prestations { get; set; }

    }

}