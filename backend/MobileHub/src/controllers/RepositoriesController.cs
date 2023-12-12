using Microsoft.AspNetCore.Mvc;
using MobileHub.src.data;
using MobileHub.src.dto.repositories;
using MobileHub.src.services.interfaces;
using Octokit;

namespace MobileHub.src.controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepositoriesController : ControllerBase
    {

        private readonly DataContext _context;
        
        private readonly IRepositoriesService _repositoriesService;

        public RepositoriesController(IRepositoriesService repositoriesService, DataContext context)
        {
            _repositoriesService = repositoriesService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<RepositoryDto>>> GetAll()
        {
            var repositories = await _repositoriesService.GetAll();
            return repositories;
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