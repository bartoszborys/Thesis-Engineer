using System;
using System.Security.Claims;

namespace Backend.Lib
{
    public class UserClaimsReader
    {
        private readonly ClaimsPrincipal User;

        public UserClaimsReader(ClaimsPrincipal user)
        {
            this.User = user;
        }

        public string Get(string calmType)
        {
            ClaimsIdentity identity = (ClaimsIdentity)User.Identity;
            return identity.FindFirst(calmType).Value;
        }

        public int GetId()
        {
            return int.Parse(this.Get(ClaimTypes.NameIdentifier));
        }
    }
}