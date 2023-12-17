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
        /// Obtiene todos los usuarios.
        /// </summary>
        /// <returns>Una lista de usuarios.</returns>
        Task<List<UserDto>> GetAll();

        /// <summary>
        /// Registra un nuevo usuario.
        /// </summary>
        /// <param name="registerUserDto">Datos del usuario a registrar.</param>
        /// <returns>El usuario registrado.</returns>
        Task<User> RegisterUser(RegisterUserDto registerUserDto);

        /// <summary>
        /// Actualiza los datos de un usuario.
        /// </summary>
        /// <param name="updateUserDto">Datos del usuario a actualizar.</param>
        /// <param name="id">ID del usuario a actualizar.</param>
        /// <returns>El usuario actualizado.</returns>
        Task<User?> UpdateUser(UpdateUserDto updateUserDto, string id);

        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        /// <param name="id">ID del usuario a obtener.</param>
        /// <returns>El usuario obtenido.</returns>
        Task<UserDto?> GetUser(string id);

        /// <summary>
        /// Actualiza la contraseña de un usuario.
        /// </summary>
        /// <param name="updatePasswordDto">Datos de la nueva contraseña.</param>
        /// <param name="id">ID del usuario a actualizar.</param>
        /// <returns>Verdadero si la contraseña se actualizó correctamente, falso en caso contrario.</returns>
        Task<bool> UpdatePassword(UpdatePasswordDto updatePasswordDto, string id);
    }
}