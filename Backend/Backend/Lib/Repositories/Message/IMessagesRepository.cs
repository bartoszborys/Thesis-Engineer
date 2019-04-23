using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Controllers;
using Backend.DatabaseModels;

namespace Backend.Lib.Repositories.Message
{
    public interface IMessagesRepository
    {
        bool Insert(Messages messageDetails);
        Messages[] GetConversation(int who, int with);
        Users[] GetGraduates(int preparedId);
    }
}
