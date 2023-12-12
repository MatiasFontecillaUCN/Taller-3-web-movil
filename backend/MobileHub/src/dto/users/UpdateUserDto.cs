using System.ComponentModel.DataAnnotations;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto.users
{
    public class UpdateUserDto
    {
        /// <summary>
        /// Correo electrónico requerido del cliente. Debe ser una dirección de correo electrónico válida.
        /// </summary>
        [EmailAddress]
        [Required]
        [UCNEmailAddressAtributte(errorMessage:"Correo invalido")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Nombre del usuario.
        /// </summary>
        [Required]
        public string Fullname { get; set; } = null!;

        /// <summary>
        /// Puntos del usuario.
        /// </summary>
        [Required]
        [Range(1900, 2023)]
        public int BirthYear { get; set; }

    }
}