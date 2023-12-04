using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileHub.src.models;

namespace MobileHub.src.repositories.interfaces
{
    /// <summary>
    /// Interfaz para el repositorio de usuarios.
    /// </summary>
    public interface IUsersRepository
    {
        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        Task<User?> GetById(string id);

        /// <summary>
        /// Obtiene todos los usuarios o solo los activos dependiendo del parámetro de estado.
        /// </summary>
        Task<List<User>> GetAll();

        /// <summary>
        /// Añade un nuevo usuario.
        /// </summary>
        Task<User> Add(User user);

        /// <summary>
        /// Actualiza un usuario existente.
        /// </summary>
        Task<User> Update(User user);

        /// <summary>
        /// Elimina un usuario existente.
        /// </summary>
        Task<User> Delete(User user);
    }
}