using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto
{
    /// <summary>
    /// Representa el objeto de transferencia de datos (DTO) para el inicio de sesión.
    /// </summary>
    public class LoginDto
    {
        private string id = string.Empty;

        /// <summary>
        /// Representa el ID de un usuario en el sistema.
        /// </summary>
        [Required]
        public string Id
        {
            get { return id; }

            /// <summary>
            /// Establece el ID de un usuario. Elimina cualquier punto o coma de la cadena de entrada.
            /// </summary>
            /// <value>El ID del usuario sin puntos ni comas.</value>
            set { id = value.Replace(".", "").Replace(",",""); }
        }

        /// <summary>
        /// Contraseña requerida para iniciar sesión.
        /// </summary>
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}