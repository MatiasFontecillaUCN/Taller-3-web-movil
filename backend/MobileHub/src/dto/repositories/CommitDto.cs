using System.ComponentModel.DataAnnotations;

namespace MobileHub.src.dto.repositories
{
    /// <summary>
    /// Clase para representar un commit en la capa de transferencia de datos.
    /// </summary>
    public class CommitDto
    {
        /// <summary>
        /// Mensaje del commit.
        /// </summary>
        [Required]
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Fecha de creación del commit.
        /// </summary>
        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;

        /// <summary>
        /// Autor del commit.
        /// </summary>
        [Required]
        public string Author { get; set; } = string.Empty;

        /// <summary>
        /// URL del avatar del autor del commit.
        /// </summary>
        [Required]
        public string AvatarUrl { get; set; } = string.Empty;
    }
}