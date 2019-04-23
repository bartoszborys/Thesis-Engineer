using System;
using System.Collections.Generic;
using System.Linq;
using Backend.Controllers;
using Backend.DatabaseModels;
using Backend.Lib.Repositories.Message;
using Backend.Models.FrontendIntegrationModels;
using Microsoft.EntityFrameworkCore;

namespace Backend.Lib.Repositories.ThesisData
{
    public class ThesisRepository : IThesisRepository
    {
        private readonly DataContext Database;

        public ThesisRepository(DataContext db)
        {
            this.Database = db;
        }

        public void Put(Users caller)
        {
            Thesis thesis = new Thesis
            {
                GraduateId = caller.Id,
                PromoterId = caller.UserdetailsUser.PromoterId,
                StateId = "BEG",
                LastAction = DateTime.Now
            };
            this.Database.Add(thesis);
            int saved = this.Database.SaveChanges();
            if ( saved != 1 )
            {
                throw new System.Exception("Wrong value of changes");
            };
        }

        public Thesis Get(int id)
        {
            return this.Database.Thesis
                    .Include(x => x.Graduate)
                    .Include(x => x.Graduate.UserdetailsUser)
                    .Include(x => x.ThesisComments)
                    .Include(x => x.State)
                    .Include(x => x.ThesisComments)
                    .Where(x => x.GraduateId == id)
                    .SingleOrDefault();
        }

        public void UpdateGrades(int graduate_id, ThesisGrades grades)
        {
            Thesis currentUserThesis = this.Get(graduate_id);

            currentUserThesis.DefenseGrade = grades.Defense;
            currentUserThesis.StudyGrade = grades.Study;
            currentUserThesis.ThesisGrade = grades.Thesis;

            int result = this.Database.SaveChanges();
            return;
        }

        public List<Thesis> GetGraduatesThesis(Users currentPromoter)
        {
            return this.Database.Thesis
                .Include(x => x.Graduate.UserdetailsUser)
                .Include(x => x.State)
                .Where(x => x.PromoterId == currentPromoter.Id)
                .ToList();
        }

        public void ChangeState(int graduate_id, string to)
        {
            Thesis currentUserThesis = this.Get(graduate_id);

            if(currentUserThesis.StateId == to)
            {
                return;
            }

            currentUserThesis.StateId = to;
            currentUserThesis.LastAction = DateTime.Now;

            if (this.Database.SaveChanges() != 1)
            {
                throw new NotImplementedException();
            };
        }

        public void InsertComment(int graduate_id, int promoter_id, ThesisComment comment)
        {
            Thesis currentUserThesis = this.Get(graduate_id);

            currentUserThesis.ThesisComments.Add(new ThesisComments {
                Date = DateTime.Now,
                GraduateId = graduate_id,
                SenderId = promoter_id,
                Message = comment.text
            });

            if (this.Database.SaveChanges() != 1)
            {
                throw new NotImplementedException();
            };
        }
    }
}