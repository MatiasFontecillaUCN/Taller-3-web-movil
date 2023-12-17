using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DotNetEnv;
using Microsoft.IdentityModel.Tokens;
using MobileHub.src.dto;
using MobileHub.src.models;
using MobileHub.src.repositories.interfaces;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.services
{
    /// <summary>
    /// Mapea una lista de GitHubCommit a una lista de CommitDto.
    /// </summary>
    /// <param name="commits">Lista de GitHubCommit a mapear.</param>
    /// <returns>Lista de CommitDto.</returns>
    public class AuthService : IAuthService
    {
        private readonly IUsersRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly string TokenSecret;
        /// <summary>
        /// Mapea una lista de GitHubCommit a una lista de CommitDto.
        /// </summary>
        /// <param name="commits">Lista de GitHubCommit a mapear.</param>
        /// <returns>Lista de CommitDto.</returns>
        public AuthService(IUsersRepository userRepository, IConfiguration configuration)
        {
            Env.Load();
            TokenSecret = Env.GetString("TOKEN");
            _userRepository = userRepository;
            _configuration = configuration;
        }

        /// <summary>
        /// Inicia sesión con las credenciales proporcionadas.
        /// </summary>
        /// <param name="loginDto">Datos de inicio de sesión del usuario.</param>
        /// <returns>Token de autenticación si las credenciales son válidas, null en caso contrario.</returns>
        public async Task<string?> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetById(loginDto.Id);
            if (user is null) return null;

            var result = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);
            if (!result) return null;

            var token = CreateToken(user);
            return token;
        }

        /// <summary>
        /// Crea un token JWT para el usuario.
        /// </summary>
        /// <param name="user">Usuario para el que se va a crear el token.</param>
        /// <returns>Token JWT.</returns>
        private string CreateToken(User user)
        {
            if (TokenSecret == null)
            {
                throw new InvalidOperationException("TOKEN configuration value is not set.");
            }
            var claims = new List<Claim>{
            new ("rut", user.Id)};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenSecret));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}