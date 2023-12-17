using System.ComponentModel.DataAnnotations;
using MobileHub.src.common;

namespace MobileHub.src.dataAnnotations
{
    /// <summary>
    /// Clase para validar si un correo electrónico pertenece al dominio UCN.
    /// </summary>
    public class UCNEmailAddressAtributte : ValidationAttribute
    {
        public UCNEmailAddressAtributte()
        {

        }

        public UCNEmailAddressAtributte(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {

        }

        public UCNEmailAddressAtributte(string errorMessage) : base(errorMessage)
        {

        }

        /// <summary>
        /// Valida si el valor proporcionado es un correo electrónico válido y pertenece al dominio UCN.
        /// </summary>
        /// <param name="value">El valor a validar.</param>
        /// <returns>Verdadero si el valor es un correo electrónico válido y pertenece al dominio UCN, falso en caso contrario.</returns>
        public override bool IsValid(object? value)
        {
            if(value is not string email) return false;
            var isValidEmail = new EmailAddressAttribute().IsValid(email);
            if (!isValidEmail) return false;
            
            try{
                var emailDomain = email.Split('@')[1];
                return RegularExpressions.UCNEmailDomainRegex().IsMatch(emailDomain);
            }
            catch(Exception){
                return false;
            }
        }
    }
}