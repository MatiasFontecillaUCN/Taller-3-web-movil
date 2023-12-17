using Microsoft.AspNetCore.Mvc;
using MobileHub.src.data;
using MobileHub.src.dto;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        /// <summary>
        /// Contexto de datos para interactuar con la base de datos.
        /// </summary>
        private readonly DataContext _context;

        /// <summary>
        /// Servicio de autenticación para manejar la lógica de autenticación.
        /// </summary>
        private readonly IAuthService _authService;

        /// <summary>
        /// Constructor para el controlador de autenticación.
        /// </summary>
        /// <param name="context">El contexto de datos.</param>
        /// <param name="authService">El servicio de autenticación.</param>
        public AuthController(DataContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        /// <summary>
        /// Método para iniciar sesión como administrador.
        /// </summary>
        /// <param name="loginDto">El DTO con los datos de inicio de sesión, contiene id del usuario y contraseña.</param>
        /// <returns>Un JWT si las credenciales son válidas, de lo contrario retorna un BadRequest.</returns>
        [HttpPost]
        public async Task<ActionResult<string>> Login(LoginDto loginDto)
        {

            var jwt = await _authService.Login(loginDto);

            if (jwt == null) { return BadRequest("Invalid Credentials"); }

            return jwt;
        }
    }

}
