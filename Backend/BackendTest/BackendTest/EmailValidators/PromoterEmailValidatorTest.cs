using System;
using Xunit;
using Backend.Lib.Exceptions;
using Backend.Data.Lib;
using Backend.Exceptions;
using Backend.Lib.EmailValidators;
using Backend.DatabaseModels;

namespace BackendTest.EmailValidators.Promoter
{
    public class PromoterEmailValidatorTest
    {
        private readonly IDetailsValidationHandler TestedValidator;

        public PromoterEmailValidatorTest()
        {
            this.TestedValidator = new PromoterDetailsValidator("Janusz.Kowalski@polsl.p");
        }

        [Fact]
        public void ValidatorAcceptsValidData()
        {
            Userdetails details = new Userdetails
            {
                Name = "Janusz",
                LastName = "Kowalski"
            };

            try
            {
                this.TestedValidator.Validate(details);
            }
            catch (InvalidEmailException)
            {
                Assert.True(false, "Exception thrown on known value.");
            }
        }

        [Fact]
        public void ValidatorNotAcceptsInvalidName()
        {
            Userdetails details = new Userdetails
            {
                Name = "Karina",
                LastName = "Kowalska"
            };

            try
            {
                this.TestedValidator.Validate(details);
                Assert.True(false, "Exception not occured for invalid name");
            }
            catch (InvalidUserDetailException) {}
        }

        [Fact]
        public void ValidatorNotAcceptsInvalidLastName()
        {
            Userdetails details = new Userdetails
            {
                Name = "Janusz",
                LastName = "Jab³oñski"
            };

            try
            {
                this.TestedValidator.Validate(details);
                Assert.True(false, "Exception not occured for invalid last name");
            }
            catch (InvalidUserDetailException) {}
        }
    }
}
