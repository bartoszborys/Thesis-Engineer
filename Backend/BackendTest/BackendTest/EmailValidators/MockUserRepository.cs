using Backend.DatabaseModels;
using Backend.Lib.Repositories.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackendTest.EmailValidators
{
    class MockUserRepository : IUserRepository
    {
        private readonly Users users;

        public MockUserRepository(Users users)
        {
            this.users = users;
        }

        public void ChangeUserPassword(string newHashedPassword, string callerEmail)
        {
            throw new NotImplementedException();
        }

        public Users Get(string email)
        {
            throw new NotImplementedException();
        }

        public Users Get(int UserId)
        {
            throw new NotImplementedException();
        }

        public List<Users> GetPromoters()
        {
            throw new NotImplementedException();
        }

        public List<Studyfields> GetStudyFields()
        {
            throw new NotImplementedException();
        }

        public bool InsertUser(Users userDetails)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(Userdetails details, string callerEmail)
        {
            throw new NotImplementedException();
        }

        public bool UserExists(int userId)
        {
            return userId == this.users.UserdetailsUser.PromoterId;
        }
    }
}
