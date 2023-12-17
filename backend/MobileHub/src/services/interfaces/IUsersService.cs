using MobileHub.src.dto.users;
using MobileHub.src.models;

namespace MobileHub.src.services.interfaces
{
    /// <summary>
    /// Interfaz para el servicio de usuarios.
    /// </summary>
    public interface IUsersService
    {
        /// <summary>
        /// Obtiene todos los usuarios con un estado específico.
        /// </summary>
        Task<List<UserDto>> GetAll();

        /// <summary>
        /// Crea un nuevo cliente.
        /// </summary>
        Task<User> RegisterUser(RegisterUserDto registerUserDto);

        /// <summary>
        /// Actualiza un usuario existente.
        /// </summary>
        Task<User?> UpdateUser(UpdateUserDto updateUserDto, string id);

        /// <summary>
        /// Elimina un usuario existente.
        /// </summary>
        Task<UserDto?> GetUser(string id);

        Task<bool> UpdatePassword(UpdatePasswordDto updatePasswordDto,string id);

    }
}