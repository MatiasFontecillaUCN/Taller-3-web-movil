using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MobileHub.src.data;
using MobileHub.src.models;
using MobileHub.src.repositories.interfaces;

namespace MobileHub.src.repositories
{
    /// <summary>
    /// Repositorio para gestionar los usuarios.
    /// </summary>
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;

        /// <summary>
        /// Constructor para inyectar dependencias.
        /// </summary>
        public UsersRepository(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene todos los usuarios.
        /// </summary>
        public async Task<List<User>> GetAll()
        {
            var allUsers = await _context.Users.ToListAsync();
            return allUsers;
        }

        /// <summary>
        /// Añade un nuevo usuario.
        /// </summary>
        public async Task<User> Add(User user)
        {
            var createdUser = (await _context.Users.AddAsync(user)).Entity;
            await _context.SaveChangesAsync();
            return createdUser;
        }

        /// <summary>
        /// Actualiza un usuario existente.
        /// </summary>
        public async Task<User> Update(User user)
        {
            var updatedUser = _context.Users.Update(user).Entity;
            await _context.SaveChangesAsync();
            return updatedUser;
        }

        /// <summary>
        /// Elimina un usuario existente.
        /// </summary>
        public async Task<User> Delete(User user)
        {
            var deletedUser = _context.Users.Remove(user).Entity;
            await _context.SaveChangesAsync();
            return deletedUser;
        }

        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        public async Task<User?> GetById(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
    }
}