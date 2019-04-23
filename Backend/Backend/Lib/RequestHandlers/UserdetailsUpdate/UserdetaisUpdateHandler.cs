using System;
using Backend.DatabaseModels;
using Backend.Lib.EmailValidators;
using Backend.Lib.Exceptions;
using Backend.Lib.Repositories.User;
using Backend.Lib.RequestHandlers;

namespace Backend.Lib.RequestHandlers.UserdetaisUpdate
{
    internal class UserdetaisUpdateHandler : IRequestHandler<bool, Userdetails>
    {
        private readonly IUserRepository UserRepository;
        private readonly string callerEmail;

        public UserdetaisUpdateHandler(IUserRepository userRepository, string callerEmail)
        {
            this.UserRepository = userRepository;
            this.callerEmail = callerEmail;
        }

        public bool Handle(Userdetails details)
        {
            this.Validate(details);
            this.UserRepository.UpdateUser(details, callerEmail);
            return true;
        }

        private void Validate(Userdetails details)
        {
            UserdetailsValidatorFactory factory = new UserdetailsValidatorFactory(this.UserRepository);
            IDetailsValidationHandler validator = factory.Get(callerEmail);
            validator.Validate(details);
        }
    }
}