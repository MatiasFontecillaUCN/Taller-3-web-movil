using MobileHub.src.dto.repositories;

namespace MobileHub.src.services.interfaces
{
    public interface IRepositoriesService
    {
        Task<List<RepositoryDto>> GetAll();
    }
}