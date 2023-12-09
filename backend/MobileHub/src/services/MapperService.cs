using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MobileHub.src.dto.users;
using MobileHub.src.models;
using MobileHub.src.services.interfaces;

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
    }
}