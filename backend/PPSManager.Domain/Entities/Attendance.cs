using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PPSManager.Domain.Entities
{
    public class Attendance : BaseEntity
    {
        [Required]
        public string Date { get; set; } = string.Empty; // Use ISO format String for flexibility or DateTime

        public int? StudentId { get; set; }
        
        [ForeignKey("StudentId")]
        public virtual Student? Student { get; set; }

        public int? StaffId { get; set; }
        
        [ForeignKey("StaffId")]
        public virtual Staff? Staff { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Present"; // Present, Absent, Late, HalfDay

        public int? PeriodId { get; set; } // For period-wise attendance

        [StringLength(200)]
        public string? Remarks { get; set; }

        public bool IsVerified { get; set; } = false;

        public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
    }
}
