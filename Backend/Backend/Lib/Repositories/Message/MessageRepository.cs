using System.Collections.Generic;
using System.Linq;
using Backend.Controllers;
using Backend.DatabaseModels;
using Backend.Lib.Repositories.Message;
using Microsoft.EntityFrameworkCore;

namespace Backend.Lib.Repositories.Message
{
    public class GlobalMessagesRepository : IMessagesRepository
    {
        private DataContext Database;

        public GlobalMessagesRepository(DataContext db)
        {
            this.Database = db;
        }

        public Messages[] GetConversation(int who, int with)
        {
            return this.Database
                .Messages
                .Where( x => x.ReciverId == who && x.SenderId == with || x.ReciverId == with && x.SenderId == who)
                .ToArray();
        }

        public Users[] GetGraduates(int preparedId)
        {
            return this.Database
                .Users
                .Include(x => x.UserdetailsUser)
                .Where(x => x.UserdetailsUser.PromoterId == preparedId)
                .ToArray();
        }

        public bool Insert(Messages messageDetails)
        {
            this.Database.Messages.Add(messageDetails);
            return this.Database.SaveChanges() == 1;
        }
    }
}