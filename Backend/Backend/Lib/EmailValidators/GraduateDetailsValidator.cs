using System;
using Backend.DatabaseModels;
using Backend.Lib.Exceptions;
using Backend.Lib.Repositories.User;

namespace Backend.Lib.EmailValidators
{
    public class GraduateDetailsValidator : IDetailsValidationHandler
    {
        private readonly string CallerEmail;
        private readonly IUserRepository UserRepository;
        public GraduateDetailsValidator(IUserRepository userRepository, string email)
        {
            this.CallerEmail = email;
            this.UserRepository = userRepository;
        }

        public void Validate(Userdetails details)
        {
            this.ValidateName(details.Name);
            this.ValidateLastName(details.LastName);
            this.ValidatePromoter(details.PromoterId);
        }

        private void ValidateName(string name)
        {
            if (!(this.CallerEmail.Substring(0, 3).ToLower() == name.Substring(0, 3).ToLower()))
            {
                throw new InvalidUserDetailException($"User name should starts with >> '{this.CallerEmail.Substring(0, 3)}'");
            };
        }

        private void ValidateLastName(string lastName)
        {
            if (!(this.CallerEmail.Substring(3, 3).ToLower() == lastName.Substring(0, 3).ToLower()))
            {
                throw new InvalidUserDetailException($"User last name should starts with >> '{this.CallerEmail.Substring(3, 3)}'");
            };
        }

        private void ValidatePromoter(int? promoterId)
        {
            int parsedPromoterId = promoterId ?? throw new InvalidUserDetailException("Promoter ID is not a number");
            if (!this.UserRepository.UserExists(parsedPromoterId))
            {
                throw new InvalidUserDetailException("Promoter with given id not exists");
            };
        }
    }
}