using System;
using System.Collections.Generic;

namespace Backend.DatabaseModels
{
    public partial class Userdetails
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string StudyFieldId { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string EngineerWork { get; set; }
        public int? PromoterId { get; set; }

        public Users Promoter { get; set; }
        public Roles RoleNavigation { get; set; }
        public Studyfields StudyField { get; set; }
        public Users User { get; set; }
    }
}
