using System.Collections.Generic;
using Backend.DatabaseModels;
using Backend.Lib.Repositories.Message;

namespace BackendTest.MessagesHandlerTest
{
    internal class MockMessagesRepository : IMessagesRepository
    {
        public List<Messages> GetConversation(Users with)
        {
            throw new System.NotImplementedException();
        }

        public Messages[] GetConversation(int who, int with)
        {
            throw new System.NotImplementedException();
        }

        public Users[] GetGraduates(int preparedId)
        {
            throw new System.NotImplementedException();
        }

        public bool Insert(Messages messageDetails)
        {
            return true;
        }
    }
}