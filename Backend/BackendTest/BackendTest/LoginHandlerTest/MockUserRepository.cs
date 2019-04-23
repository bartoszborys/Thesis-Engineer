using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using Backend.Lib.Repositories.User;
using Scrypt;
using Backend.DatabaseModels;

namespace BackendTest.LoginHandlerTest
{
    public class MockUserRepository : IUserRepository
    {
        private string FakeSalt;
        private string ExpectedPassword;
        private string ExpectedLogin;

        public MockUserRepository(string _expectedLogin, string _expectedPassword)
        {
            this.ExpectedPassword = _expectedPassword;
            this.ExpectedLogin = _expectedLogin;
            this.FakeSalt = "TrulySecretSalt";
        }

        public void ChangeUserPassword(string newHashedPassword, string callerEmail)
        {
            throw new NotImplementedException();
        }

        public Users Get(string email)
        {
            if(email != ExpectedLogin)
            {
                return null;
            }

            var scryptProvider = new ScryptEncoder();
            return new Users
            {
                Email = email,
                Passwords = new Passwords
                {
                    SensitivePassword = scryptProvider.Encode(this.FakeSalt + this.ExpectedPassword),
                    SafetySalt = this.FakeSalt
                },
                SafetySalt = this.FakeSalt
            };
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
            throw new NotImplementedException();
        }
    }
}
