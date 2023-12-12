using System.ComponentModel.DataAnnotations;

namespace MobileHub.src.dataAnnotations
{
    public class RutAttribute : ValidationAttribute
    {
        public RutAttribute()
        {

        }

        public RutAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {

        }

        public RutAttribute(string errorMessage) : base(errorMessage)
        {

        }

        public override bool IsValid(object? value)
        {
            bool validation = false;
            if (value is not string rut) return validation;
            try
            {
                rut = rut.ToUpper();
                rut = rut.Replace(".", "");
                rut = rut.Replace("-", "");
                rut = rut.Replace(",", "");
                int rutAux = int.Parse(rut.Substring(0, rut.Length - 1));

                char dv = char.Parse(rut.Substring(rut.Length - 1, 1));

                int m = 0, s = 1;
                for (; rutAux != 0; rutAux /= 10)
                {
                    s = (s + rutAux % 10 * (9 - m++ % 6)) % 11;
                }
                if (dv == (char)(s != 0 ? s + 47 : 75))
                {
                    validation = true;
                }
            }
            catch (Exception)
            {
                validation = false;
            }
            return validation;
        }
    }
}