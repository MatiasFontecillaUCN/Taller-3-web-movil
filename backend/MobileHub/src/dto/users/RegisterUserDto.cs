using System.ComponentModel.DataAnnotations;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto.users
{
    public class RegisterUserDto
    {
        /// <summary>
        /// Identificación del usuario.
        /// </summary>
        [Required]
        [Rut(errorMessage:"Rut invalido")]
        public string Id { get; set; } = null!;

        /// <summary>
        /// Correo electrónico requerido del cliente. Debe ser una dirección de correo electrónico válida.
        /// </summary>
        [Required]
        [UCNEmailAddressAtributte(errorMessage:"Correo invalido")]
        public string Email { get; set; } = string.Empty;

        
        [Required]
        [StringLength(150, ErrorMessage = "El nombre completo no puede tener mas de 150 caracteres")]
        [MinLength(10, ErrorMessage = "El nombre completo no puede tener menos de 10 caracteres")]
        public string Fullname { get; set; } = null!;

        /// <summary>
        /// Puntos del usuario.
        /// </summary>
        [Required]
        [Range(1900, 2023)]
        public int BirthYear { get; set; }

    }
}