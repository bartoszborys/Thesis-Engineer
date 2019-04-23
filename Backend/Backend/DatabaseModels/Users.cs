using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Users
    {
        public Users()
        {
            Globalmessages = new HashSet<Globalmessages>();
            MessagesReciver = new HashSet<Messages>();
            MessagesSender = new HashSet<Messages>();
            ThesisComments = new HashSet<ThesisComments>();
            ThesisPromoter = new HashSet<Thesis>();
            UserdetailsPromoter = new HashSet<Userdetails>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string SafetySalt { get; set; }

        public Passwords Passwords { get; set; }
        public Thesis ThesisGraduate { get; set; }
        public Userdetails UserdetailsUser { get; set; }
        public ICollection<Globalmessages> Globalmessages { get; set; }
        public ICollection<Messages> MessagesReciver { get; set; }
        public ICollection<Messages> MessagesSender { get; set; }
        public ICollection<ThesisComments> ThesisComments { get; set; }
        public ICollection<Thesis> ThesisPromoter { get; set; }
        public ICollection<Userdetails> UserdetailsPromoter { get; set; }
    }
}
