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
        /// Crea un nuevo cliente.
        /// </summary>
        Task<User> RegisterUser(CreateUserDto createUserDto);
    }
}