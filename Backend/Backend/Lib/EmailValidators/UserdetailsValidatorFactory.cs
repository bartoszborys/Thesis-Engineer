using Backend.Exceptions;
using Backend.Lib.Repositories.User;
using System;

namespace Backend.Lib.EmailValidators
{
    public class UserdetailsValidatorFactory
    {
        private IUserRepository Repository;
        public UserdetailsValidatorFactory(IUserRepository repository)
        {
            this.Repository = repository;
        }

        public IDetailsValidationHandler Get(string email)
        {
            string[] dividedEmail = email.Split('@');
            if (dividedEmail.Length > 2)
            {
                throw new InvalidEmailException(email);
            }

            switch (dividedEmail[1])
            {
                case "student.polsl.pl":
                    return new GraduateDetailsValidator(this.Repository, email);

                case "polsl.pl":
                    return new PromoterDetailsValidator(email);

                default:
                    throw new InvalidEmailException(email);
            }
        }
    }
}