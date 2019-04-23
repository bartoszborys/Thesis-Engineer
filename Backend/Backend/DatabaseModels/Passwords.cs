using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Passwords
    {
        public string SafetySalt { get; set; }
        public string SensitivePassword { get; set; }

        public Users SafetySaltNavigation { get; set; }
    }
}
