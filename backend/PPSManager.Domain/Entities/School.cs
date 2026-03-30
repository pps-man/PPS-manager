using System.ComponentModel.DataAnnotations;

namespace PPSManager.Domain.Entities
{
    public class School
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Subdomain { get; set; } = string.Empty; // For subdomain based routing

        public string? LogoUrl { get; set; }

        public string? Address { get; set; }

        [Required]
        [EmailAddress]
        public string AdminEmail { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        
        public string? SubscriptionPlan { get; set; } = "Basic"; // SaaS model: Basic, Pro, Enterprise
        
        public DateTime SubscriptionExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
