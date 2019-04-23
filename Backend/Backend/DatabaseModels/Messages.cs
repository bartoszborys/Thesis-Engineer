using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Messages
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int SenderId { get; set; }
        public int ReciverId { get; set; }
        public string Message { get; set; }

        public Users Reciver { get; set; }
        public Users Sender { get; set; }
    }
}
