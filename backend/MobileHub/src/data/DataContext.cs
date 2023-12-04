using Microsoft.EntityFrameworkCore;
using MobileHub.src.models;

namespace MobileHub.src.data
{
    public class DataContext : DbContext
    {
        /// <summary>
        /// Constructor para el contexto de datos.
        /// </summary>
        /// <param name="options">Las opciones para la configuración del contexto.</param>
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        /// <summary>
        /// Conjunto de datos para los usuarios.
        /// </summary>
        public DbSet<User> Users { get; set; } = null!;

        /// <summary>
        /// Método para llenar la vase de datos con los datos semilla.
        /// </summary>
        /// <param name="modelBuilder">El constructor del modelo.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>(entity => { entity.Property(e => e.Id).IsRequired(); });

            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string passwordHash = BCrypt.Net.BCrypt.HashPassword("a", salt);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "a",
                Fullname = "Usuario De Prueba",
                Email = "example@ucn.cl",
                BirthYear = 2000,
                PasswordHash = passwordHash,
                PasswordSalt = salt
            });
        }
    }
}