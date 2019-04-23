using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Data.Lib
{
    public interface RoleFactory
    {
        string get(string email);
    }
}
