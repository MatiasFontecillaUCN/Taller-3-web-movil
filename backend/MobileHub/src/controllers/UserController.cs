using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MobileHub.src.data;
using MobileHub.src.dto.users;
using MobileHub.src.models;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        [HttpPost("create")]
        public async Task<ActionResult<User>> Create(CreateUserDto createUserDto)
        {
            var created = await _userService.RegisterUser(createUserDto);
            return created;
        }

        /// <summary>
        /// Método para obtener todos los usuarios con un estado específico.
        /// </summary>
        /// <param name="status">El estado de los usuarios a obtener.</param>
        /// <returns>Una lista de usuarios.</returns>
        [HttpGet("read")]
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
        [HttpPut("update/{id}")]
        public async Task<User?> UpdateUser(UpdateUserDto updateUserDto, string id)
        {
            var user = await _userService.UpdateUser(updateUserDto, id);
            return user;
        }

        /// <summary>
        /// Método para eliminar un usuario.
        /// </summary>
        /// <param name="id">El ID del usuario a eliminar.</param>
        /// <returns>El usuario eliminado.</returns>
        [HttpDelete("delete/{id}")]
        public async Task<User?> DeleteUser(string id)
        {
            var user = await _userService.DeleteUser(id);
            return user;
        }
        
    }
}