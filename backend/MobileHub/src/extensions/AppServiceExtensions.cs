using Microsoft.EntityFrameworkCore;
using MobileHub.src.data;
using MobileHub.src.repositories;
using MobileHub.src.repositories.interfaces;
using MobileHub.src.services;
using MobileHub.src.services.interfaces;

namespace MobileHub.src.extensions
{
    /// <summary>
    /// Extensiones para IServiceCollection para agregar servicios de aplicación.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Agrega los servicios de aplicación al IServiceCollection.
        /// </summary>
        /// <param name="services">El IServiceCollection al que agregar los servicios.</param>
        /// <param name="config">La configuración de la aplicación.</param>
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            AddSwaggerGen(services);
            AddRepositories(services);
            AddServices(services);
            AddDbContext(services);
            AddAutoMapper(services);
        }

        /// <summary>
        /// Agrega SwaggerGen al IServiceCollection.
        /// </summary>
        /// <param name="services">El IServiceCollection al que agregar SwaggerGen.</param>
        private static void AddSwaggerGen(IServiceCollection services)
        {
            services.AddSwaggerGen();
        }

        /// <summary>
        /// Agrega los repositorios al IServiceCollection.
        /// </summary>
        /// <param name="services">El IServiceCollection al que agregar los repositorios.</param>
        private static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IUsersRepository, UsersRepository>();
        }

        /// <summary>
        /// Agrega los servicios al IServiceCollection.
        /// </summary>
        /// <param name="services">El IServiceCollection al que agregar los servicios.</param>
        private static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IMapperService, MapperService>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IRepositoriesService, RepositoriesService>();
        }

        /// <summary>
        /// Agrega el contexto de la base de datos al IServiceCollection.
        /// </summary>
        /// <param name="services">El IServiceCollection al que agregar el contexto de la base de datos.</param>
        private static void AddDbContext(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt => opt.UseSqlite("Data Source=AppDatabase.db"));
        }

        /// <summary>
        /// Agrega AutoMapper al IServiceCollection.
        /// </summary>
        /// <param name="services">El IServiceCollection al que agregar AutoMapper.</param>
        private static void AddAutoMapper(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Program).Assembly);
        }
    }
}