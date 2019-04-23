using Backend.Data.Lib;
using Backend.DatabaseModels;
using Backend.Exceptions.Login;
using Backend.Lib.Repositories.User;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using Scrypt;

namespace Backend.Lib.RequestHandlers.Login
{
    public class LoginHandler : IRequestHandler<JWT, UserCredentials>
    {
        private IUserRepository UserRepository;
        private readonly string TokenSecret;
        public LoginHandler(IUserRepository _userRepository, string _tokenSecret)
        {
            this.UserRepository = _userRepository;
            this.TokenSecret = _tokenSecret;
        }

        public JWT Handle(UserCredentials credentials)
        {
            Users userData = UserRepository.Get(credentials.Email);
            this.CheckThatUserExists(userData);
            this.CheckPassword(userData, credentials.Password);
            return this.GenerateToken(userData);
        }

        private void CheckThatUserExists(Users userData)
        {
            if (userData == null)
            {
                throw new InvalidCredentialsException("User with given email not exists");
            }
        }
        
        private void CheckPassword(Users userData, string givenPassword)
        {
            ScryptEncoder scryptProvider = new ScryptEncoder();
            string givenPasswordWithSalt = userData.SafetySalt + givenPassword;
            string cryptedPassword = userData.Passwords.SensitivePassword;

            if( !scryptProvider.Compare(givenPasswordWithSalt, cryptedPassword) )
            {
                throw new InvalidCredentialsException("Password is invalid");
            }
        }

        private JWT GenerateToken(Users userData)
        {
            TokenGenerator generator = new TokenGenerator(this.TokenSecret);
            return new JWT
            {
                Token = generator.Generate(userData)
            };
        }
    }
}
