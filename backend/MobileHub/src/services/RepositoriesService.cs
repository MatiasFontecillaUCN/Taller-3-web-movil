using DotNetEnv;
using MobileHub.src.dto.repositories;
using MobileHub.src.services.interfaces;
using Octokit;

namespace MobileHub.src.services
{
    // <summary>
    /// Actualiza la contraseña de un usuario.
    /// </summary>
    /// <param name="updatePasswordDto">Datos de la nueva contraseña.</param>
    /// <param name="id">ID del usuario a actualizar.</param>
    /// <returns>Verdadero si la contraseña se actualizó correctamente, falso en caso contrario.</returns>
    public class RepositoriesService : IRepositoriesService
    {
        private readonly IMapperService _mapperService;
        private readonly string GitHubToken;
        private readonly string GitHubUser;

        // <summary>
        /// Actualiza la contraseña de un usuario.
        /// </summary>
        /// <param name="updatePasswordDto">Datos de la nueva contraseña.</param>
        /// <param name="id">ID del usuario a actualizar.</param>
        /// <returns>Verdadero si la contraseña se actualizó correctamente, falso en caso contrario.</returns>
        public RepositoriesService(IMapperService mapperService)
        {

            Env.Load();
            GitHubToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            GitHubUser = Env.GetString("GITHUB_USER");
            _mapperService = mapperService;
        }

        /// <summary>
        /// Obtiene todos los repositorios.
        /// </summary>
        /// <returns>Lista de repositorios.</returns>
        public async Task<List<RepositoryDto>> GetAll()
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var tockenCred = new Credentials(GitHubToken);
            client.Credentials = tockenCred;
            var repositories = (await client.Repository.GetAllForUser(GitHubUser)).ToList();
            if (repositories is null) throw new BadHttpRequestException("Usuario no encontrado");
            repositories = repositories.OrderByDescending(r => r.UpdatedAt).ToList();
            var getCommitsTask = repositories.Select(r =>
            {
                if (r.Size == 0)
                {
                    return GetAllCommitsByRepository(client, "");
                }
                return GetAllCommitsByRepository(client, r.Name);
            });
            var commitsResult = await Task.WhenAll(getCommitsTask);
            var mappedRepositories = _mapperService.MapRepositories(repositories, commitsResult);
            return mappedRepositories;
        }

        /// <summary>
        /// Obtiene todos los commits de un repositorio.
        /// </summary>
        /// <param name="repositoryName">Nombre del repositorio.</param>
        /// <returns>Lista de commits.</returns>
        public async Task<List<CommitDto>> GetCommits(string repositoryName)
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var tockenCred = new Credentials(GitHubToken);
            client.Credentials = tockenCred;
            try
            {
                var commits = (await client.Repository.Commit.GetAll(GitHubUser, repositoryName)).ToList();
                var mappedCommits = _mapperService.MapCommits(commits);
                return mappedCommits;
            }
            catch
            {
                throw new BadHttpRequestException("Repositorio no encontrado");
            }
        }

        /// <summary>
        /// Obtiene todos los commits de un repositorio por su nombre.
        /// </summary>
        /// <param name="client">Cliente de GitHub.</param>
        /// <param name="repoName">Nombre del repositorio.</param>
        /// <returns>Número de commits.</returns>
        private async Task<int> GetAllCommitsByRepository(GitHubClient client, string repoName)
        {
            if (repoName == "") return 0;

            var commits = await client.Repository.Commit.GetAll(GitHubUser, repoName);
            if (commits is null) return 0;

            return commits.Count;

        }
    }
}