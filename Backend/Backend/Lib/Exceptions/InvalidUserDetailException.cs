using System;
using System.Runtime.Serialization;

namespace Backend.Lib.Exceptions
{
    [Serializable]
    public class InvalidUserDetailException : Exception
    {
        public InvalidUserDetailException()
        {
        }

        public InvalidUserDetailException(string message) : base(message)
        {
        }

        public InvalidUserDetailException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected InvalidUserDetailException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}