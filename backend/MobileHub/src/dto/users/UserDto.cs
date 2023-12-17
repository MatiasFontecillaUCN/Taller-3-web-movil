using System.ComponentModel.DataAnnotations;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto.users
{
    /// <summary>
    /// Clase para representar a un usuario en la capa de transferencia de datos.
    /// </summary>
    public class UserDto
    {
        private string id = string.Empty;

        /// <summary>
        /// Identificador del usuario. Se eliminan los puntos y las comas.
        /// </summary>
        [Required]
        [Rut(errorMessage: "Rut invalido")]
        public string Id
        {
            get { return id; }

            /// <summary>
            /// Establece el ID de un usuario. Elimina cualquier punto o coma de la cadena de entrada.
            /// </summary>
            /// <value>El ID del usuario sin puntos ni comas.</value>
            set { id = value.Replace(".", "").Replace(",", ""); }
        }

        /// <summary>
        /// Correo electrónico del usuario.
        /// </summary>
        [EmailAddress]
        [Required]
        [UCNEmailAddressAtributte(errorMessage: "Correo invalido")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Nombre completo del usuario.
        /// </summary>
        [Required]
        public string Fullname { get; set; } = null!;

        /// <summary>
        /// Año de nacimiento del usuario.
        /// </summary>
        [Required]
        [Range(1900, 2023)]
        public int BirthYear { get; set; }
    }
}