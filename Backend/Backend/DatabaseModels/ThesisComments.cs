using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class ThesisComments
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int GraduateId { get; set; }
        public DateTime Date { get; set; }
        public string Message { get; set; }

        public Thesis Graduate { get; set; }
        public Users Sender { get; set; }
    }
}
