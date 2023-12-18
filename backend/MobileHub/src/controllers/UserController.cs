using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobileHub.src.data;
using MobileHub.src.dto.users;
using MobileHub.src.models;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// Contexto de datos para interactuar con la base de datos.
        /// </summary>
        private readonly DataContext _context;

        /// <summary>
        /// Servicio de usuarios para manejar la lógica de gestión de usuarios.
        /// </summary>
        private readonly IUsersService _userService;

        /// <summary>
        /// Constructor para el controlador de usuarios.
        /// </summary>
        /// <param name="context">El contexto de datos.</param>
        /// <param name="userService">El servicio de usuarios.</param>
        public UserController(DataContext context, IUsersService userService)
        {
            _context = context;
            _userService = userService;
        }

        /// <summary>
        /// Método para crear un nuevo usuario.
        /// </summary>
        /// <param name="createClientDto">El DTO con los datos del usuario a crear.</param>
        /// <returns>El usuario creado.</returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Create(RegisterUserDto registerUserDto)
        {
            var created = await _userService.RegisterUser(registerUserDto);
            return created;
        }

        /// <summary>
        /// Método para obtener todos los usuarios.
        /// </summary>
        /// <returns>Una lista de usuarios.</returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<List<UserDto>> GetAllUsers()
        {
            var users = await _userService.GetAll();
            return users;
        }

        /// <summary>
        /// Método para actualizar un usuario.
        /// </summary>
        /// <param name="updateClientDto">El DTO con los datos del usuario a actualizar.</param>
        /// <param name="id">El ID del usuario a actualizar.</param>
        /// <returns>El usuario actualizado.</returns>
        [HttpPatch("{id}")]
        public async Task<User?> UpdateUser(UpdateUserDto updateUserDto, string id)
        {
            var user = await _userService.UpdateUser(updateUserDto, id);
            return user;
        }

        /// <summary>
        /// Método para obtener un usuario.
        /// </summary>
        /// <param name="id">El ID del usuario a obtener.</param>
        /// <returns>El usuario obtenido.</returns>
        [HttpGet("{id}")]
        public async Task<UserDto?> GetUser(string id)
        {
            var user = await _userService.GetUser(id);
            return user;
        }

        [HttpPatch("update-password/{id}")]
        public async Task<bool> UpdatePassword(UpdatePasswordDto updatePasswordDto,string id){
            var succes = await _userService.UpdatePassword(updatePasswordDto, id);
            return succes;
        }
        
    }
}