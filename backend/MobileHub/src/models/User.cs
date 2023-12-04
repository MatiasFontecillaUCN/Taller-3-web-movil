using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MobileHub.src.models
{
    public class User
    {
        /// <summary>
        /// Identificador único del usuario.
        /// </summary>
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// Nombre completo del usuario.
        /// </summary>
        public string Fullname { get; set; } = string.Empty;

        /// <summary>
        /// Año de nacimiento del usuario.
        /// </summary>
        public int BirthYear { get; set; }

        /// <summary>
        /// Hash de la contraseña.
        /// </summary>
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Sal de la contraseña.
        /// </summary>
        public string Password_Salt { get; set; } = string.Empty;
    }
}