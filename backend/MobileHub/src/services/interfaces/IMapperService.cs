using MobileHub.src.dto.users;
using MobileHub.src.models;

namespace MobileHub.src.services.interfaces
{
    // <summary>
    /// Interfaz para el servicio de mapeo.
    /// </summary>
    public interface IMapperService
    {
        /// <summary>
        /// Mapea una lista de usuarios a una lista de UserDto.
        /// </summary>
        List<UserDto> MapUsers(List<User> users);

        /// <summary>
        /// Mapea un CreateClientDto a un User.
        /// </summary>
        User CreateUserDtoToUser(CreateUserDto createUserDto);
    }
}