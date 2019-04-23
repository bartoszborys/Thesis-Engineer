using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.FrontendIntegrationModels
{
    public class ThesisDetails
    {
        public string thesisName;
        public string stateName;
        public DateTime lastActionDate;
        public float? ThesisGrade;
        public float? StudyGrade;
        public float? DefenseGrade;
        public string graduateFile;
        public string promoterFile;
        public List<ThesisComment> comments; 
    }
}
