using System;
using Xunit;
using Backend.Lib.RequestHandlers;
using Backend.Lib.RequestHandlers.Login;
using Backend.Exceptions.Login;
using Backend.Models;

namespace BackendTest.LoginHandlerTest
{
    public class MessagesHandlerTest
    {
        private IRequestHandler<JWT, UserCredentials> TestHandler;
        private string TokenSecretFake = "SantaClausNotExists;SantaClausNotExists;SantaClausNotExists;";
        private string ExpectedLogin = "FunnyLogin";
        private string ExpectedPassword = "FunnyPassword";

        public MessagesHandlerTest()
        {
            this.TestHandler = new LoginHandler( new MockUserRepository(ExpectedLogin, ExpectedPassword), TokenSecretFake);
        }
        
        [Fact]
        public void GeneratesToken()
        {
            try
            {
                JWT token = this.TestHandler.Handle(new UserCredentials{
                    Email = ExpectedLogin,
                    Password = ExpectedPassword
                });
            }
            catch(InvalidCredentialsException e)
            {
                Assert.True(false, $"Exception occured durign login: {e.Message}");
            }
            
        }

        [Fact]
        public void HandleInvalidLogin()
        {
            try
            {
                JWT token = this.TestHandler.Handle(new UserCredentials
                {
                    Email = "InvalidLogin",
                    Password = ExpectedPassword
                });
                Assert.True(false, $"Exception not occured when login was invalid");
            }
            catch (InvalidCredentialsException e) { }
        }

        [Fact]
        public void HandleInvalidPassword()
        {
            try
            {
                JWT token = this.TestHandler.Handle(new UserCredentials
                {
                    Email = ExpectedLogin,
                    Password = "Invalid password"
                });
                Assert.True(false, $"Exception not occured when password was invalid");
            }
            catch (InvalidCredentialsException e) { }
        }
    }
}
