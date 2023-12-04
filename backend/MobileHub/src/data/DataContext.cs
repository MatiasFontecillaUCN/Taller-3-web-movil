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
    }
}