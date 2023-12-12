using MobileHub.src.dto.repositories;
using MobileHub.src.dto.users;
using Octokit;
using User = MobileHub.src.models.User;

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
        /// Mapea un RegisterUserDto a un User.
        /// </summary>        
        User RegisterUserDtoRoUser(RegisterUserDto registerUserDto);

        List<RepositoryDto> MapRepositories(List<Repository> repositories, int[] commitsResult);

    }
}