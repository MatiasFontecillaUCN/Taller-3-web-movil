using MobileHub.src.dto.users;
using MobileHub.src.models;
using MobileHub.src.repositories.interfaces;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.services
{
    /// <summary>
    /// Servicio para gestionar usuarios.
    /// </summary>
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapperService _mapperService;

        /// <summary>
        /// Constructor para inyectar dependencias.
        /// </summary>
        public UsersService(IUsersRepository usersRepository, IMapperService mapperService)
        {
            _usersRepository = usersRepository;
            _mapperService = mapperService;
        }

        /// <summary>
        /// Obtiene todos los usuarios con un estado específico.
        /// </summary>
        public async Task<List<UserDto>> GetAll()
        {
            var users = await _usersRepository.GetAll();
            var mappedUsers = _mapperService.MapUsers(users);
            return mappedUsers;
        }

        /// <summary>
        /// Crea un nuevo usuario.
        /// </summary>
        public async Task<User> RegisterUser(CreateUserDto createUserDto)
        {
            var mappedUser = _mapperService.CreateUserDtoToUser(createUserDto);
            // if (!_validateRutHelper.ValidateRut(mappedUser.Id))
            // {
            //     throw new BadHttpRequestException("Formato de rut no valido");
            // }
            var user = await _usersRepository.GetById(createUserDto.Id);
            if (user != null)
            {
                throw new BadHttpRequestException("Ese usuario ya existe");
            }
            user = await _usersRepository.Add(mappedUser);
            return user;
        }

        /// <summary>
        /// Actualiza un usuario existente.
        /// </summary>
        public async Task<User?> UpdateUser(UpdateUserDto updateUserDto, string id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null)
            {
                throw new BadHttpRequestException("Usuario no encontrado");
            }
            user.Email = updateUserDto.Email;
            user.Fullname = updateUserDto.Fullname;
            user.BirthYear = updateUserDto.BirthYear;

            var updatedUser = await _usersRepository.Update(user);
            return updatedUser;
        }

        /// <summary>
        /// Elimina un usuario existente.
        /// </summary>
        public async Task<User?> DeleteUser(string id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null)
            {
                throw new BadHttpRequestException("Ese usuario ya existe");

            }
            var deletedUser = await _usersRepository.Delete(user);
            return deletedUser;
        }
    }
}