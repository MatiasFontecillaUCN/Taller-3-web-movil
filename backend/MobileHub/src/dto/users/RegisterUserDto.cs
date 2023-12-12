using System.ComponentModel.DataAnnotations;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto.users
{
    public class RegisterUserDto
    {
        private static int birthYear;
        private string id = string.Empty;

        [Required]
        [Rut(errorMessage: "Rut invalido")]
        public string Id
        {
            get { return id; }
            set { id = value.Replace(".", ""); }
        }

        /// <summary>
        /// Correo electrónico requerido del cliente. Debe ser una dirección de correo electrónico válida.
        /// </summary>
        [Required]
        [UCNEmailAddressAtributte(errorMessage: "Correo invalido")]
        public string Email { get; set; } = string.Empty;


        [Required]
        [StringLength(150, ErrorMessage = "El nombre completo no puede tener mas de 150 caracteres")]
        [MinLength(10, ErrorMessage = "El nombre completo no puede tener menos de 10 caracteres")]
        public string Fullname { get; set; } = null!;

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