using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MobileHub.src.dataAnnotations;

namespace MobileHub.src.dto
{
    public class LoginDto
    {
        private string id = string.Empty;

        [Required]
        // [Rut(errorMessage: "Rut invalido")]
        public string Id
        {
            get { return id; }
            set { id = value.Replace(".", "").Replace(",",""); }
        }

        /// <summary>
        /// Contraseña requerida para iniciar sesión.
        /// </summary>
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}