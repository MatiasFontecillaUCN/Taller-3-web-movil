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
    public class AuthService : IAuthService
    {
        private readonly IUsersRepository _userRepository;
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Constructor para inyectar dependencias.
        /// </summary>
        public AuthService(IUsersRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        /// <summary>
        /// Inicia sesión con las credenciales proporcionadas.
        /// </summary>
        public async Task<string?> Login(LoginDto loginDto)
        {
            Console.WriteLine("Login Service!");
            var user = await _userRepository.GetById(loginDto.Id);
            if (user is null) return null;

            var result = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);
            if (!result) return null;

            var token = CreateToken(user);
            return token;
        }

        /// <summary>
        /// Crea un token JWT para el administrador.
        /// </summary>
        private string CreateToken(User user)
        {
            Env.Load();
            string tokenSecret = Env.GetString("TOKEN");

            if (tokenSecret == null)
            {
                throw new InvalidOperationException("TOKEN configuration value is not set.");
            }
            var claims = new List<Claim>{
            new ("rut", user.Id)};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecret));

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