using Microsoft.EntityFrameworkCore;
using PPSManager.Domain.Entities;
using PPSManager.Domain.Interfaces;
using System.Reflection;

namespace PPSManager.Infrastructure.Data
{
    public class PPSManagerDbContext : DbContext
    {
        private readonly ITenantProvider _tenantProvider;

        public PPSManagerDbContext(DbContextOptions<PPSManagerDbContext> options, ITenantProvider tenantProvider)
            : base(options)
        {
            _tenantProvider = tenantProvider;
        }

        public DbSet<School> Schools { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        // Add other DbSets here as we create entities...

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure multi-tenancy global filters
            var currentSchoolId = _tenantProvider.GetSchoolId() ?? 0;

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
                {
                    // modelBuilder.Entity(entityType.ClrType)
                    //     .HasQueryFilter(e => ((BaseEntity)e).SchoolId == currentSchoolId);
                    
                    // Use a dynamic filter if possible, or build it manually
                    // For static SchoolId filtering during the request:
                    var parameter = System.Linq.Expressions.Expression.Parameter(entityType.ClrType, "e");
                    var schoolIdProperty = System.Linq.Expressions.Expression.Property(parameter, "SchoolId");
                    var currentSchoolIdExpression = System.Linq.Expressions.Expression.Constant(currentSchoolId);
                    var comparison = System.Linq.Expressions.Expression.Equal(schoolIdProperty, currentSchoolIdExpression);
                    var lambda = System.Linq.Expressions.Expression.Lambda(comparison, parameter);
                    
                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                    
                    // Add Index for SchoolId automatically
                    modelBuilder.Entity(entityType.ClrType).HasIndex("SchoolId");
                }
            }

            // Seed initial school or Super Admin settings
            // ...
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var currentSchoolId = _tenantProvider.GetSchoolId();

            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    if (currentSchoolId.HasValue)
                    {
                        entry.Entity.SchoolId = currentSchoolId.Value;
                    }
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
