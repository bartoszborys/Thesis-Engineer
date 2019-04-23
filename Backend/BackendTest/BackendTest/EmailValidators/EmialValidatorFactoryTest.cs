using System;
using Xunit;
using Backend.Data.Lib;
using Backend.Exceptions;
using Backend.Lib.EmailValidators;

namespace BackendTest.EmailValidators
{
    public class EmialValidatorFactoryTest
    {
        readonly UserdetailsValidatorFactory TestedFactory;
        public EmialValidatorFactoryTest()
        {
            this.TestedFactory = new UserdetailsValidatorFactory(new MockUserRepository(new Backend.DatabaseModels.Users()));
        }


        [Fact]
        public void FactoryAcceptsKnownEmails()
        {
            try
            {
                this.TestedFactory.Get("aaabbb@student.polsl.pl");
                this.TestedFactory.Get("aaabbb@polsl.pl");
            }
            catch (InvalidEmailException)
            {
                Assert.True(false, "Exception thrown on known value.");
            }
        }

        [Fact]
        public void FactoryNotAcceptsKnownEmails()
        {
            try
            {
                this.TestedFactory.Get("aaabbb@unknownmail.pl");
                Assert.True(false, "Unknown value accepted");
            }
            catch (InvalidEmailException)
            {
            }
        }

        [Fact]
        public void CheckFactoryProducts()
        {
            bool GraduateValidator = this.TestedFactory.Get("aaabbb@student.polsl.pl") is GraduateDetailsValidator;
            Assert.True(GraduateValidator, "Factory not returned GraduateValidator");

            bool PromoterValidator = this.TestedFactory.Get("aaabbb@polsl.pl") is PromoterDetailsValidator;
            Assert.True(GraduateValidator, "Factory not returned PromoterValidator");
        }
    }
}
