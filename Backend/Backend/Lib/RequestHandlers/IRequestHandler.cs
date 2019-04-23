using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Lib.RequestHandlers
{
    public interface IRequestHandler<ResultType, ParamsType>
    {
        ResultType Handle(ParamsType parameters);
    }
}
