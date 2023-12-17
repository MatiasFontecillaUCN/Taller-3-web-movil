using MobileHub.src.dto.repositories;
using MobileHub.src.dto.users;
using Octokit;
using User = MobileHub.src.models.User;

namespace MobileHub.src.services.interfaces
{
    /// <summary>
    /// Interfaz para el servicio de mapeo.
    /// </summary>
    public interface IMapperService
    {
        /// <summary>
        /// Mapea una lista de usuarios a una lista de UserDto.
        /// </summary>
        /// <param name="users">Lista de usuarios a mapear.</param>
        /// <returns>Lista de UserDto.</returns>
        List<UserDto> MapUsers(List<User> users);

        /// <summary>
        /// Mapea un RegisterUserDto a un User.
        /// </summary>
        /// <param name="registerUserDto">Objeto RegisterUserDto a mapear.</param>
        /// <returns>Objeto User.</returns>
        User RegisterUserDtoRoUser(RegisterUserDto registerUserDto);

        /// <summary>
        /// Mapea una lista de Repository a una lista de RepositoryDto.
        /// </summary>
        /// <param name="repositories">Lista de Repository a mapear.</param>
        /// <param name="commitsResult">Array de números de commits.</param>
        /// <returns>Lista de RepositoryDto.</returns>
        List<RepositoryDto> MapRepositories(List<Repository> repositories, int[] commitsResult);

        /// <summary>
        /// Mapea una lista de GitHubCommit a una lista de CommitDto.
        /// </summary>
        /// <param name="commits">Lista de GitHubCommit a mapear.</param>
        /// <returns>Lista de CommitDto.</returns>
        List<CommitDto> MapCommits(List<GitHubCommit> commits);

        /// <summary>
        /// Mapea un User a un UserDto.
        /// </summary>
        /// <param name="user">Objeto User a mapear.</param>
        /// <returns>Objeto UserDto.</returns>
        UserDto UserToUserDto(User user);
    }
}