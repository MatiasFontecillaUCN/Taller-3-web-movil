using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.src.dto.repositories;
using Octokit;

namespace MobileHub.src.controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepositoriesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Repository>>> GetAll()
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var token = "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";
            var tockenCred = new Credentials(token);
            client.Credentials = tockenCred;

            var repositories = (await client.Repository.GetAllForUser("Dizkm8")).ToList();

            repositories = repositories.OrderByDescending(r => r.UpdatedAt).ToList();

            var getCommitsTask = repositories.Select(r => GeatAllCommitsByRepository(client, r.Name));

            var commitsResult = await Task.WhenAll(getCommitsTask);



            var mappedRepositories = repositories.Select((r, index) =>
            {
                var entity = new RepositoryDto
                {
                    Name = r.Name,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CommitsAmount = commitsResult[index]
                };
                return entity;
            });


            return Ok(mappedRepositories);
        }

        private async Task<int> GeatAllCommitsByRepository(GitHubClient client, string repoName)
        {
            var commits = await client.Repository.Commit.GetAll("Dizkm8", repoName);
            if (commits is null) return 0;
            return commits.Count;

        }

        //     [HttpGet]
        //     public async Task<ActionResult<List<GitHubCommit>>> Commits()
        //     {
        //         Env.Load();
        //         var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
        //         var token = Env.GetString("GITHUB_ACCESS_TOKEN");
        //         var tockenCred = new Credentials(token);
        //         client.Credentials = tockenCred;

        //         var commits = (await client.Repository.Commit.GetAll("Dizkm8","Hackathon")).ToList();
        //         return commits;
        //     }
        // }
    }
}