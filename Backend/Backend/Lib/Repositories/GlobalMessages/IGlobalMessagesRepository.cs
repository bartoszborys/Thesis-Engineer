using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Controllers;
using Backend.DatabaseModels;

namespace Backend.Lib.Repositories.GlobalMessages
{
    public interface IGlobalMessagesRepository
    {
        List<Globalmessages> Get(int promoter_id);
        void Put(Globalmessages newMessage);
        void Patch(Globalmessages newMessage);
        void Delete(int id);
    }
}
