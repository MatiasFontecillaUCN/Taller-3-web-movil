using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.src.dto
{
    public class LoginDto
    {
        /// <summary>
        /// Id requerida para iniciar sesión.
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