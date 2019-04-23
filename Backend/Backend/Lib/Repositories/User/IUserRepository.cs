using Backend.DatabaseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Lib.Repositories.User
{
    public interface IUserRepository
    {
        Users Get(string email);
        Users Get(int UserId);
        List<Users> GetPromoters();
        bool InsertUser(Users userDetails);
        void UpdateUser(Userdetails details, string callerEmail);
        bool UserExists(int userId);
        List<Studyfields> GetStudyFields();
        void ChangeUserPassword(string newHashedPassword, string callerEmail);
    }
}
