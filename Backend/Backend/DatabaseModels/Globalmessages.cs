using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Globalmessages
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Message { get; set; }
        public string TypeId { get; set; }
        public int SenderId { get; set; }

        public Users Sender { get; set; }
        public Globalmessagestypes Type { get; set; }
    }
}
