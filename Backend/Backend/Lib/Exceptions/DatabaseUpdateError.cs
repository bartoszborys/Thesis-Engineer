using System;
using System.Runtime.Serialization;

namespace Backend.Lib.Exceptions
{
    [Serializable]
    internal class DatabaseUpdateError : Exception
    {
        public DatabaseUpdateError()
        {
        }

        public DatabaseUpdateError(string message) : base(message)
        {
        }

        public DatabaseUpdateError(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected DatabaseUpdateError(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}