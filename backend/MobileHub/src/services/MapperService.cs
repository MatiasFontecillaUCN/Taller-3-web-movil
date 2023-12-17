using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MobileHub.src.dto.repositories;
using MobileHub.src.dto.users;
using MobileHub.src.services.interfaces;
using Octokit;
using User = MobileHub.src.models.User;

namespace MobileHub.src.services
{

    /// <summary>
    /// Servicio para mapear objetos de un tipo a otro.
    /// </summary>
    public class MapperService : IMapperService
    {
        private readonly IMapper _mapper;


        /// <summary>
        /// Constructor del servicio de mapeo.
        /// </summary>
        /// <param name="mapper">Objeto IMapper para realizar el mapeo.</param>
        public MapperService(IMapper mapper)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Mapea una lista de usuarios a una lista de UserDto.
        /// </summary>
        /// <param name="users">Lista de usuarios a mapear.</param>
        /// <returns>Lista de UserDto.</returns>
        public List<UserDto> MapUsers(List<User> users)
        {
            var mappedUsers = users.Select(u => _mapper.Map<UserDto>(u)).ToList();
            return mappedUsers;
        }

        /// <summary>
        /// Mapea un RegisterUserDto a un User.
        /// </summary>
        /// <param name="registerUserDto">Objeto RegisterUserDto a mapear.</param>
        /// <returns>Objeto User.</returns>
        public User RegisterUserDtoRoUser(RegisterUserDto registerUserDto)
        {
            var mappedUser = _mapper.Map<User>(registerUserDto);
            return mappedUser;
        }

        /// <summary>
        /// Mapea un User a un UserDto.
        /// </summary>
        /// <param name="user">Objeto User a mapear.</param>
        /// <returns>Objeto UserDto.</returns>
        public UserDto UserToUserDto(User user)
        {
            var mappedUser = _mapper.Map<UserDto>(user);
            return mappedUser;
        }

        /// <summary>
        /// Mapea una lista de Repository a una lista de RepositoryDto.
        /// </summary>
        /// <param name="repositories">Lista de Repository a mapear.</param>
        /// <param name="commitsResult">Array de números de commits.</param>
        /// <returns>Lista de RepositoryDto.</returns>
        public List<RepositoryDto> MapRepositories(List<Repository> repositories, int[] commitsResult)
        {
            var mappedRepositories = repositories.Select((r, index) =>
            {
                var entity = new RepositoryDto
                {
                    Name = r.Name,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CommitsAmount = commitsResult[index]
                };
                return entity;
            }).ToList();
            return mappedRepositories;
        }

        /// <summary>
        /// Mapea una lista de GitHubCommit a una lista de CommitDto.
        /// </summary>
        /// <param name="commits">Lista de GitHubCommit a mapear.</param>
        /// <returns>Lista de CommitDto.</returns>
        public List<CommitDto> MapCommits(List<GitHubCommit> commits)
        {
            var mappedCommits = commits.Select(c =>
            {
                try
                {

                    var entity = new CommitDto
                    {
                        Message = c.Commit.Message,
                        CreatedAt = c.Commit.Author.Date,
                        Author = c.Commit.Author.Name,
                        AvatarUrl = c.Committer.AvatarUrl
                    };
                    return entity;
                }
                catch
                {
                    var entity = new CommitDto
                    {
                        Message = c.Commit.Message,
                        CreatedAt = c.Commit.Author.Date,
                        Author = c.Commit.Author.Name,
                        AvatarUrl = "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-icon.png"
                    };
                    return entity;
                }
            }

            ).ToList();
            return mappedCommits;
        }
    }
}