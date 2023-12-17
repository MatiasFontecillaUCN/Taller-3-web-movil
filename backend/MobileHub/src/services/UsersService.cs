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
        public async Task<User> RegisterUser(RegisterUserDto registerUserDto)
        {
            var mappedUser = _mapperService.RegisterUserDtoRoUser(registerUserDto);
            var user = await _usersRepository.GetById(registerUserDto.Id);
            if (user != null) throw new BadHttpRequestException("Ese usuario ya existe");

            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(mappedUser.Id.Replace(",", "").Replace("-", "").Replace(".", ""), salt);
            mappedUser.PasswordSalt = salt;
            mappedUser.PasswordHash = passwordHash;

            user = await _usersRepository.Add(mappedUser);
            return mappedUser;
        }

        /// <summary>
        /// Actualiza un usuario existente.
        /// </summary>
        public async Task<User?> UpdateUser(UpdateUserDto updateUserDto, string id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null) throw new BadHttpRequestException("Usuario no encontrado"); 
            user.Email = updateUserDto.Email;
            user.Fullname = updateUserDto.Fullname;
            user.BirthYear = updateUserDto.BirthYear;

            var updatedUser = await _usersRepository.Update(user);
            return updatedUser;
        }

        /// <summary>
        /// Elimina un usuario existente.
        /// </summary>
        public async Task<UserDto?> GetUser(string id)
        {
            var user = await _usersRepository.GetById(id);
            if (user == null) throw new BadHttpRequestException("Ese usuario no existe");
            var mappedUser = _mapperService.UserToUserDto(user);

            return mappedUser;
        }

        public async Task<bool> UpdatePassword(UpdatePasswordDto updatePasswordDto,string id){
            var user = await _usersRepository.GetById(id);
            if(user is null) throw new BadHttpRequestException("Usuario no encontrado");

            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(updatePasswordDto.Password, salt);
            user.PasswordSalt = salt;
            user.PasswordHash = passwordHash;

            await _usersRepository.Update(user);
            return true;

        }
    }
}