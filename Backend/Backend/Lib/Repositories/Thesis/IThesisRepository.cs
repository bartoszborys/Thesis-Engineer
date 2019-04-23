using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Controllers;
using Backend.DatabaseModels;
using Backend.Models.FrontendIntegrationModels;

namespace Backend.Lib.Repositories.ThesisData
{
    public interface IThesisRepository
    {
        Thesis Get(int id);
        void Put(Users id);
        void UpdateGrades(int graduate_id, ThesisGrades grades);
        List<Thesis> GetGraduatesThesis(Users currentPromoter);
        void ChangeState(int id, string to);
        void InsertComment(int graduate_id, int promoter_id, ThesisComment comment);
    }
}
