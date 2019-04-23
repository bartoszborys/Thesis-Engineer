using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class ThesisStates
    {
        public ThesisStates()
        {
            Thesis = new HashSet<Thesis>();
        }

        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<Thesis> Thesis { get; set; }
    }
}
