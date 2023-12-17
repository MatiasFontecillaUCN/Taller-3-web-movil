using System.ComponentModel.DataAnnotations;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto.users
{
    /// <summary>
    /// Clase para representar el registro de un usuario en la capa de transferencia de datos.
    /// </summary>
    public class RegisterUserDto
    {
        private static int birthYear;
        private string id = string.Empty;

        /// <summary>
        /// Identificador del usuario. Se eliminan los puntos y las comas.
        /// </summary>
        [Required]
        [Rut(errorMessage: "Rut invalido")]
        public string Id
        {
            get { return id; }
            set { id = value.Replace(".", "").Replace(",", ""); }
        }

        /// <summary>
        /// Correo electrónico del usuario.
        /// </summary>
        [Required]
        [UCNEmailAddressAtributte(errorMessage: "Correo invalido")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Nombre completo del usuario.
        /// </summary>
        [Required]
        [StringLength(150, ErrorMessage = "El nombre completo no puede tener mas de 150 caracteres")]
        [MinLength(10, ErrorMessage = "El nombre completo no puede tener menos de 10 caracteres")]
        public string Fullname { get; set; } = null!;

        /// <summary>
        /// Año de nacimiento del usuario.
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