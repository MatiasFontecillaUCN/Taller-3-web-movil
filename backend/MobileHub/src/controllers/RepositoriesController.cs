using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobileHub.src.data;
using MobileHub.src.dto.repositories;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.controllers
{
    /// <summary>
    /// Controlador para gestionar los repositorios.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class RepositoriesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IRepositoriesService _repositoriesService;

        /// <summary>
        /// Constructor del controlador de repositorios.
        /// </summary>
        /// <param name="repositoriesService">Servicio de repositorios.</param>
        /// <param name="context">Contexto de la base de datos.</param>
        public RepositoriesController(IRepositoriesService repositoriesService, DataContext context)
        {
            _repositoriesService = repositoriesService;
            _context = context;
        }

        /// <summary>
        /// Obtiene todos los repositorios.
        /// </summary>
        /// <returns>Una lista de repositorios.</returns>
        [HttpGet]
        public async Task<ActionResult<List<RepositoryDto>>> GetAll()
        {
            var repositories = await _repositoriesService.GetAll();
            return repositories;
        }

        /// <summary>
        /// Obtiene todos los commits de un repositorio.
        /// </summary>
        /// <param name="repositoryName">Nombre del repositorio.</param>
        /// <returns>Una lista de commits.</returns>
        [HttpGet("{repositoryName}")]
        public async Task<ActionResult<List<CommitDto>>> GetCommits(string repositoryName)
        {
            var commits = await _repositoriesService.GetCommits(repositoryName);
            return commits;
        }
    }
}