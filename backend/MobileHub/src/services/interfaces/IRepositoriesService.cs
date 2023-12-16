using MobileHub.src.dto.repositories;
using Octokit;

namespace MobileHub.src.services.interfaces
{
    public interface IRepositoriesService
    {
        Task<List<RepositoryDto>> GetAll();

        Task<List<CommitDto>> GetCommits(string repositoryName);
    }
}