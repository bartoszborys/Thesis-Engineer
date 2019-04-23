using System;
using Backend.Lib.Exceptions;
using Backend.DatabaseModels;

namespace Backend.Lib.EmailValidators
{
    public class PromoterDetailsValidator : IDetailsValidationHandler
    {
        private readonly string EmailWithoutDomain;

        public PromoterDetailsValidator(string email)
        {
            this.EmailWithoutDomain = email.Split('@')[0];
        }

        public void Validate(Userdetails details)
        {
            this.ValidateName(details.Name);
            this.ValidateLastName(details.LastName);
            this.ValidateEngineerWork(details.EngineerWork);
            this.ValidatePromoterId(details.PromoterId);
        }

        private void ValidateName(string name)
        {
            string NamePart = EmailWithoutDomain.Split('.')[0];
            if(NamePart != name)
            {
                throw new InvalidUserDetailException("Name not match");
            }
        }

        private void ValidateLastName(string lastName)
        {
            string LastNamePart = EmailWithoutDomain.Split('.')[1];
            if (LastNamePart != lastName)
            {
                throw new InvalidUserDetailException("Name not match");
            }
        }
        private void ValidateEngineerWork(string engineerWork)
        {
            if (engineerWork != null)
            {
                throw new InvalidUserDetailException("Invalid engineer work");
            };
        }

        private void ValidatePromoterId(int? UserId)
        {
            if (UserId != null)
            {
                throw new InvalidUserDetailException("Invalid promoter id");
            };
        }
    }
}