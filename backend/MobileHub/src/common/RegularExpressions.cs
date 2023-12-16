using System.Text.RegularExpressions;

namespace MobileHub.src.common
{
    public static partial class RegularExpressions
    {
        [GeneratedRegex("^([a-zA-Z]+\\.)*ucn\\.cl$", RegexOptions.Compiled)]
        public static partial Regex UCNEmailDomainRegex();
    }
}