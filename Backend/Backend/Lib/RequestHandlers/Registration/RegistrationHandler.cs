using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data.Lib;
using Backend.DatabaseModels;
using Backend.Exceptions;
using Backend.Lib.Repositories.User;
using Scrypt;

namespace Backend.Lib.RequestHandlers.Registration
{
    public class RegistrationHandler : IRequestHandler<bool, UserCredentials>
    {
        private readonly IUserRepository UserRepository;
        private readonly string TokenSecret;

        public RegistrationHandler(IUserRepository userRepository, string tokenSecret)
        {
            this.UserRepository = userRepository;
            this.TokenSecret = tokenSecret;
        }

        public bool Handle(UserCredentials parameters)
        {
            this.EmailsIsInUse(parameters.Email);
            Users newUser = this.ParseParameters(parameters);
            this.UserRepository.InsertUser(newUser);
            return true;
        }

        private Users ParseParameters(UserCredentials parameters)
        {
            string safetySalt = this.GetUniqueSalt();
            return new Users
            {
                Email = parameters.Email,
                SafetySalt = safetySalt,
                Passwords = new Passwords
                {
                    SafetySalt = safetySalt,
                    SensitivePassword = this.GetEncryptPassword(parameters.Password, safetySalt)
                },
                UserdetailsUser = new Userdetails
                {
                    Role = this.GetRole(parameters.Email)
                }
            };
        }

        private string GetUniqueSalt()
        {
            return new SaltGenerator().Get();
        }

        private string GetEncryptPassword(string password, string safetySalt)
        {
            return new ScryptEncoder().Encode(safetySalt + password);
        }

        private string GetRole(string email)
        {
            return new RoleFactoryImp().get(email);
        }

        public void EmailsIsInUse(string Email)
        {
            if( !(null == this.UserRepository.Get(Email)) )
            {
                throw new RegistrationException("Email is in use");
            };
        }
    }
}
