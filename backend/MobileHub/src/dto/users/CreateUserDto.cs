using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.src.dto.users
{
    public class CreateUserDto
    {
        /// <summary>
        /// Identificación del usuario.
        /// </summary>
        [Required]
        public string Id { get; set; } = null!;

        /// <summary>
        /// Correo electrónico requerido del cliente. Debe ser una dirección de correo electrónico válida.
        /// </summary>
        [EmailAddress]
        [Required]
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