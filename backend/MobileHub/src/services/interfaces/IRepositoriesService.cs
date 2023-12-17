using MobileHub.src.dto.repositories;

namespace MobileHub.src.services.interfaces
{
    /// <summary>
    /// Interfaz para el servicio de repositorios.
    /// </summary>
    public interface IRepositoriesService
    {
        /// <summary>
        /// Obtiene todos los repositorios.
        /// </summary>
        /// <returns>Una lista de repositorios.</returns>
        Task<List<RepositoryDto>> GetAll();

        /// <summary>
        /// Obtiene todos los commits de un repositorio.
        /// </summary>
        /// <param name="repositoryName">Nombre del repositorio.</param>
        /// <returns>Una lista de commits.</returns>
        Task<List<CommitDto>> GetCommits(string repositoryName);
    }
}