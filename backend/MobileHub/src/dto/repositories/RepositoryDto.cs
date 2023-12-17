using System.ComponentModel.DataAnnotations;

namespace MobileHub.src.dto.repositories
{
    /// <summary>
    /// Clase para representar un repositorio en la capa de transferencia de datos.
    /// </summary>
    public class RepositoryDto
    {
        /// <summary>
        /// Nombre del repositorio.
        /// </summary>
        [Required]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Fecha de creación del repositorio.
        /// </summary>
        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;

        /// <summary>
        /// Fecha de última actualización del repositorio.
        /// </summary>
        [Required]
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.Now;

        /// <summary>
        /// Cantidad de commits en el repositorio.
        /// </summary>
        [Required]
        public int CommitsAmount { get; set; }
    }
}