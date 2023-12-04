using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MobileHub.src.dto.users;
using MobileHub.src.models;

namespace MobileHub.src.extensions
{
    /// <summary>
    /// Perfil de mapeo para AutoMapper.
    /// </summary>
    public class MappingProfile : Profile
    {
        /// <summary>
        /// Configura los mapeos para AutoMapper.
        /// </summary>
        public MappingProfile()
        {
            // Mapeo de User a UserDto
            CreateMap<User, CreateUserDto>();
        }
    }
}