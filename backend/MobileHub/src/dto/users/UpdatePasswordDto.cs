using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.src.dto.users
{
    public class UpdatePasswordDto
    {
        [Required]
        public string Password { get; set; } = string.Empty;

    }
}