namespace PPSManager.Domain.Interfaces
{
    public interface ITenantProvider
    {
        int? GetSchoolId();
        string? GetSubdomain();
    }
}
