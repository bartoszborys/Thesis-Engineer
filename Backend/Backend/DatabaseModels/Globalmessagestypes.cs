using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Globalmessagestypes
    {
        public Globalmessagestypes()
        {
            Globalmessages = new HashSet<Globalmessages>();
        }

        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<Globalmessages> Globalmessages { get; set; }
    }
}
