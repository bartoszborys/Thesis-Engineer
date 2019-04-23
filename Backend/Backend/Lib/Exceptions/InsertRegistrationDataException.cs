using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Exceptions
{
    public class InsertRegistrationDataException : Exception
    {
        public InsertRegistrationDataException()
        {
        }

        public InsertRegistrationDataException(string message) : base(message) { }
    }
}
