using System.ComponentModel.DataAnnotations;

namespace MobileHub.src.dto.repositories
{
    public class CommitDto
    {
        [Required]
        public string Message { get; set; } = string.Empty;
        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        [Required]
        public string Author { get; set; } = string.Empty;
        [Required]
        public string AvatarUrl { get; set; } = string.Empty;
        
    }
}