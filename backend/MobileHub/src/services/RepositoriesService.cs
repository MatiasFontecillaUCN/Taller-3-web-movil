using DotNetEnv;
using MobileHub.src.dto.repositories;
using MobileHub.src.services.interfaces;
using Octokit;

namespace MobileHub.src.services
{
    public class RepositoriesService : IRepositoriesService
    {
        private readonly IMapperService _mapperService;
        private readonly string GitHubToken;
        private readonly string GitHubUser;

        public RepositoriesService(IMapperService mapperService)
        {

            Env.Load();
            GitHubToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            GitHubUser = Env.GetString("GITHUB_USER");
            _mapperService = mapperService;
        }

        public async Task<List<RepositoryDto>> GetAll()
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var tockenCred = new Credentials(GitHubToken);
            client.Credentials = tockenCred;
            var repositories = (await client.Repository.GetAllForUser(GitHubUser)).ToList();
            if (repositories is null) throw new BadHttpRequestException("Usuario no encontrado");
            repositories = repositories.OrderByDescending(r => r.UpdatedAt).ToList();
            var getCommitsTask = repositories.Select(r => GetAllCommitsByRepository(client, r.Name));
            var commitsResult = await Task.WhenAll(getCommitsTask);
            var mappedRepositories = _mapperService.MapRepositories(repositories, commitsResult);
            return mappedRepositories;
        }

        public async Task<List<GitHubCommit>> GetCommits(string repositoryName)
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var tockenCred = new Credentials(GitHubToken);
            client.Credentials = tockenCred;
            try
            {
                var commits = (await client.Repository.Commit.GetAll("Dizkm8", repositoryName)).ToList();
                return commits;
            }
            catch
            {

                throw new BadHttpRequestException("Repositorio no encontrado");
            }
        }

        private async Task<int> GetAllCommitsByRepository(GitHubClient client, string repoName)
        {
            var commits = await client.Repository.Commit.GetAll("Dizkm8", repoName);
            if (commits is null) return 0;
            return commits.Count;

        }
    }
}