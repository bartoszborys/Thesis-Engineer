using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Thesis
    {
        public Thesis()
        {
            ThesisComments = new HashSet<ThesisComments>();
        }

        public int GraduateId { get; set; }
        public int? PromoterId { get; set; }
        public string StateId { get; set; }
        public DateTime LastAction { get; set; }
        public float? FinalGrade { get; set; }
        public float ThesisGrade { get; set; }
        public float StudyGrade { get; set; }
        public float DefenseGrade { get; set; }
        public string GraduateFile { get; set; }
        public string PromoterFile { get; set; }

        public Users Graduate { get; set; }
        public Users Promoter { get; set; }
        public ThesisStates State { get; set; }
        public ICollection<ThesisComments> ThesisComments { get; set; }
    }
}
