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
    /// Servicio para gestionar el mapeo de objetos.
    /// </summary>
    public class MapperService : IMapperService
    {
        private readonly IMapper _mapper;

        /// <summary>
        /// Constructor para inyectar dependencias.
        /// </summary>
        public MapperService(IMapper mapper)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Mapea una lista de usuarios a una lista de UserDto.
        /// </summary>
        public List<UserDto> MapUsers(List<User> users)
        {
            var mappedUsers = users.Select(u => _mapper.Map<UserDto>(u)).ToList();
            return mappedUsers;
        }

        /// <summary>
        /// Mapea un CreateClientDto a un User.
        /// </summary>
        public User RegisterUserDtoRoUser(RegisterUserDto registerUserDto)
        {
            var mappedUser = _mapper.Map<User>(registerUserDto);
            return mappedUser;
        }

        /// <summary>
        /// Mapea un UserDto a un User.
        /// </summary>
        public User UserDtoToUser(UserDto userDto)
        {
            var mappedUser = _mapper.Map<User>(userDto);
            return mappedUser;
        }

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