using System.ComponentModel.DataAnnotations;

namespace MobileHub.src.dto.users
{
    /// <summary>
    /// Clase para representar la actualización de la contraseña de un usuario en la capa de transferencia de datos.
    /// </summary>
    public class UpdatePasswordDto
    {
        /// <summary>
        /// Nueva contraseña del usuario.
        /// </summary>
        [Required]
        public string NewPassword { get; set; } = string.Empty;
        /// <summary>
        /// Contraseña actual del usuario.
        /// </summary>
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}