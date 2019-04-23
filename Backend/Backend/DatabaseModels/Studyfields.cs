using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Studyfields
    {
        public Studyfields()
        {
            Userdetails = new HashSet<Userdetails>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Faculty { get; set; }

        public ICollection<Userdetails> Userdetails { get; set; }
    }
}
