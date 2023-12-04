using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileHub.src.dto;

namespace MobileHub.src.services.interfaces
{
    /// <summary>
    /// Interfaz para el servicio de autenticación.
    /// </summary>
    public interface IAuthService
    {
        /// <summary>
        /// Inicia sesión con las credenciales proporcionadas.
        /// </summary>
        Task<string?> Login(LoginDto loginDto);
    }
}