using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Exceptions
{
    public class EmailNotUniqueException : Exception
    {
        public EmailNotUniqueException()
        {
        }

        public EmailNotUniqueException(string message) : base(message) { }
    }
}
