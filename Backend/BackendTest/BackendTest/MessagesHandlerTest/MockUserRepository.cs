using System.Collections.Generic;
using Backend.DatabaseModels;
using Backend.Lib.Repositories.User;

namespace BackendTest.MessagesHandlerTest
{
    internal class MockUserRepository : IUserRepository
    {
        public void ChangeUserPassword(string newHashedPassword, string callerEmail)
        {
            throw new System.NotImplementedException();
        }

        public Users Get(string email)
        {
            return new Users
            {
                Id = 12
            };
        }

        public Users Get(int UserId)
        {
            throw new System.NotImplementedException();
        }

        public List<Users> GetPromoters()
        {
            throw new System.NotImplementedException();
        }

        public List<Studyfields> GetStudyFields()
        {
            throw new System.NotImplementedException();
        }

        public bool InsertUser(Users userDetails)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateUser(Userdetails details, string callerEmail)
        {
            throw new System.NotImplementedException();
        }

        public bool UserExists(int userId)
        {
            throw new System.NotImplementedException();
        }
    }
}