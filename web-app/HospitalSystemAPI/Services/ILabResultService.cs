using Hospital.API.Dtos;

namespace Hospital.API.Services
{
    public interface ILabResultService
    {
        Task<List<LabResultDto>> GetLabResultsAsync(int? patientId = null);
    }
}
