using System.Text.RegularExpressions;

namespace MobileHub.src.common
{
    /// <summary>
    /// Clase estática que contiene expresiones regulares comunes.
    /// </summary>
    public static partial class RegularExpressions
    {
        /// <summary>
        /// Expresión regular para validar si un dominio de correo electrónico pertenece a UCN.
        /// </summary>
        /// <returns>Una expresión regular que valida si un dominio de correo electrónico pertenece a UCN.</returns>
        [GeneratedRegex("^([a-zA-Z]+\\.)*ucn\\.cl$", RegexOptions.Compiled)]
        public static partial Regex UCNEmailDomainRegex();
    }
}