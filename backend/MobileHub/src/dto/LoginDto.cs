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
        /// <summary>
        /// Representa el correo de un usuario en el sistema.
        /// </summary>
        [Required]
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// Contraseña requerida para iniciar sesión.
        /// </summary>
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}