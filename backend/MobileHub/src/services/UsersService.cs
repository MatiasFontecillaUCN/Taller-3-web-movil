using MobileHub.src.dto.users;
using MobileHub.src.models;
using MobileHub.src.repositories.interfaces;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.services
{
    /// <summary>
    /// Servicio para gestionar las operaciones de los usuarios.
    /// </summary>
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapperService _mapperService;


        /// <summary>
        /// Constructor del servicio de usuarios.
        /// </summary>
        /// <param name="usersRepository">Repositorio de usuarios.</param>
        /// <param name="mapperService">Servicio de mapeo.</param>
        public UsersService(IUsersRepository usersRepository, IMapperService mapperService)
        {
            _usersRepository = usersRepository;
            _mapperService = mapperService;
        }


        /// <summary>
        /// Obtiene todos los usuarios.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        public async Task<List<UserDto>> GetAll()
        {
            var users = await _usersRepository.GetAll();
            var mappedUsers = _mapperService.MapUsers(users);
            return mappedUsers;
        }


        /// <summary>
        /// Registra un nuevo usuario.
        /// </summary>
        /// <param name="registerUserDto">Datos del usuario a registrar.</param>
        /// <returns>Usuario registrado.</returns>
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
        /// Actualiza los datos de un usuario.
        /// </summary>
        /// <param name="updateUserDto">Datos del usuario a actualizar.</param>
        /// <param name="id">ID del usuario a actualizar.</param>
        /// <returns>Usuario actualizado.</returns>
        public async Task<User?> UpdateUser(UpdateUserDto updateUserDto, string id)
        {
            id = id.Replace(".", "").Replace(",", "");
            var user = await _usersRepository.GetById(id);
            if (user == null) throw new BadHttpRequestException("Usuario no encontrado");
            user.Email = updateUserDto.Email;
            user.Fullname = updateUserDto.Fullname;
            user.BirthYear = updateUserDto.BirthYear;

            var updatedUser = await _usersRepository.Update(user);
            return updatedUser;
        }

        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        /// <param name="id">ID del usuario a obtener.</param>
        /// <returns>Usuario obtenido.</returns>
        public async Task<UserDto?> GetUser(string id)
        {
            var user = await _usersRepository.GetByEmail(id);
            if (user == null) throw new BadHttpRequestException("Ese usuario no existe");
            var mappedUser = _mapperService.UserToUserDto(user);

            return mappedUser;
        }

        // <summary>
        /// Actualiza la contraseña de un usuario.
        /// </summary>
        /// <param name="updatePasswordDto">Datos de la nueva contraseña.</param>
        /// <param name="id">ID del usuario a actualizar.</param>
        /// <returns>Verdadero si la contraseña se actualizó correctamente, falso en caso contrario.</returns>
        public async Task<bool> UpdatePassword(UpdatePasswordDto updatePasswordDto, string id)
        {
            var user = await _usersRepository.GetByEmail(id);
            if (user is null) throw new BadHttpRequestException("Usuario no encontrado");

            var result = BCrypt.Net.BCrypt.Verify(updatePasswordDto.Password, user.PasswordHash);
            if (!result) throw new BadHttpRequestException("Contraseña invalida");
            Console.WriteLine("NewPassword = " + updatePasswordDto);
            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(updatePasswordDto.NewPassword, salt);
            user.PasswordSalt = salt;
            user.PasswordHash = passwordHash;

            await _usersRepository.Update(user);
            return true;

        }
    }
}