using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using Octokit;

namespace MobileHub.src.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RepositoriesController : ControllerBase
    {
        // [HttpGet]
        // public async Task<ActionResult<List<Repository>>> Get()
        // {
        //     var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
        //     var token = "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";
        //     var tockenCred = new Credentials(token);
        //     client.Credentials = tockenCred;

        //     var repositories = (await client.Repository.GetAllForUser("Dizkm8")).ToList();
        //     return repositories;
        // }

        [HttpGet]
        public async Task<ActionResult<List<GitHubCommit>>> Commits()
        {
            Env.Load();
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var token = Env.GetString("GITHUB_ACCESS_TOKEN");
            var tockenCred = new Credentials(token);
            client.Credentials = tockenCred;

            var commits = (await client.Repository.Commit.GetAll("Dizkm8","Hackathon")).ToList();
            return commits;
        }
    }
}