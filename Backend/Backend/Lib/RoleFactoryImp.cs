using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Exceptions;

namespace Backend.Data.Lib
{
    public class RoleFactoryImp : RoleFactory
    {
        public string get(string email)
        {
            string[] dividedEmail = email.Split('@');
            if (dividedEmail.Length > 2)
            {
                throw new InvalidEmailException(email);
            }
            
            switch( dividedEmail[1] )
            {
                case "student.polsl.pl":
                    return "GRD";

                case "polsl.pl":
                    return "PRO";

                default:
                    throw new InvalidEmailException(email);
            }
        }
    }
}
