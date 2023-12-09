using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MobileHub.src.common;

namespace MobileHub.src.dataAnnotations
{
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