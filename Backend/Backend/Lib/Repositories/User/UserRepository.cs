using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DatabaseModels;
using Backend.Lib.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Backend.Lib.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private DataContext db;
        public UserRepository(DataContext _db)
        {
            this.db = _db;
        }

        public Users Get(string email)
        {
            return db.Users
                .Include(x => x.Passwords)
                .Include(x => x.UserdetailsUser)
                .Include(x => x.UserdetailsUser.Promoter)
                .Where( x=> x.Email == email )
                .FirstOrDefault();
        }

        public Users Get(int UserId)
        {
            return db.Users
                .Include(x => x.Passwords)
                .Include(x => x.UserdetailsUser)
                .Include(x => x.UserdetailsUser.Promoter)
                .Where(x => x.Id == UserId)
                .FirstOrDefault();
        }

        public List<Users> GetPromoters()
        {
            return db.Users
                .Include( x => x.UserdetailsUser)
                .Where(x => x.UserdetailsUser.Role == "PRO")
                .ToList();
        }

        public List<Studyfields> GetStudyFields()
        {
            return db
                .Studyfields
                .ToList();
        }

        public bool InsertUser(Users newUser)
        {
            this.db.Users.Add(newUser);
            return (this.db.SaveChanges() == 1);
        }

        public void UpdateUser(Userdetails details, string callerEmail)
        {
            Users user = this.Get(callerEmail);

            user.UserdetailsUser.Name = details.Name;
            user.UserdetailsUser.LastName = details.LastName;
            user.UserdetailsUser.EngineerWork = details.EngineerWork;
            user.UserdetailsUser.PromoterId = details.PromoterId;
            user.UserdetailsUser.StudyFieldId = details.StudyFieldId;

            int savedChanges = this.db.SaveChanges();
            if ( savedChanges != 1 )
            {
                throw new DatabaseUpdateError($"Error occured during userdetails update. Number of saved changes: {savedChanges}");
            };
        }

        public bool UserExists(int userId)
        {
            return this.Get(userId) != null;
        }

        public void ChangeUserPassword(string newHashedPassword, string callerEmail)
        {
            Users toChange = this.Get(callerEmail);
            toChange.Passwords.SensitivePassword = newHashedPassword;
            this.db.SaveChanges();
        }
    }
}
