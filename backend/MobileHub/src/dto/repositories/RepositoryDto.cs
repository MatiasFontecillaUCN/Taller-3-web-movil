using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.src.dto.repositories
{
    public class RepositoryDto
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        [Required]
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.Now;
        [Required]
        public int CommitsAmount { get; set; }
    }
}