using System.ComponentModel.DataAnnotations;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto.users
{
    public class UpdateUserDto
    {
        private int birthYear;
        /// <summary>
        /// Correo electrónico requerido del cliente. Debe ser una dirección de correo electrónico válida.
        /// </summary>
        [EmailAddress]
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
        public int BirthYear
        {
            get { return birthYear; }
            set
            {
                if (value > DateTime.Now.Year || value < 1900)
                    throw new ArgumentOutOfRangeException("Año de nacimiento invalido");
                birthYear = value;
            }
        }

    }
}