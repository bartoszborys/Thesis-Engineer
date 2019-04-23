using System.Collections.Generic;
using System.Linq;
using Backend.Controllers;
using Backend.DatabaseModels;
using Backend.Lib.Repositories.Message;
using Microsoft.EntityFrameworkCore;

namespace Backend.Lib.Repositories.GlobalMessages
{
    internal class GlobalMessagesRepository : IGlobalMessagesRepository
    {
        private readonly DataContext Database;

        public GlobalMessagesRepository(DataContext db)
        {
            this.Database = db;
        }

        public List<Globalmessages> Get(int promoter_id)
        {
            return this.Database
                .Globalmessages
                .Where(x => x.SenderId == promoter_id)
                .ToList();
        }

        public void Put(Globalmessages newMessage)
        {
            this.Database.Add(newMessage);
            if (this.Database.SaveChanges() != 1)
            {
                throw new System.Exception();
            };
        }

        public void Patch(Globalmessages newMessage)
        {
            var oldMessage = this.Database.Globalmessages.Where(x => x.Id == newMessage.Id).Single();
            oldMessage.Header = newMessage.Header;
            oldMessage.Message = newMessage.Message;
            oldMessage.TypeId = newMessage.TypeId;

            int changesCount = this.Database.SaveChanges();

            if (changesCount != 1)
            {
                throw new System.Exception();
            };
        }

        public void Delete(int id)
        {
            this.Database.Remove(this.Database.Globalmessages.Where(x => x.Id == id).Single());
            this.Database.SaveChanges();
        }
    }
}