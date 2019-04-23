using System;
using Xunit;
using Backend.Data.Lib;
using Backend.Exceptions;

namespace BackendTest
{
    public class RoleFactoryTest
    {
        readonly RoleFactoryImp Tested;
        public RoleFactoryTest()
        {
            this.Tested = new RoleFactoryImp();
        }
        

        [Fact]
        public void CheckCorrectValues()
        {
            try
            {
                this.Tested.get("aaabbb@student.polsl.pl");
                this.Tested.get("aaabbb@polsl.pl");
            }
            catch(InvalidEmailException)
            {
                Assert.True(false, "Exeption thrown on known value.");
            }
        }

        [Fact]
        public void CheckIncorrectValues()
        {
            RoleFactory factory = new RoleFactoryImp();
            string[] testValues = { "aaabbb@gmail.com", "aaabbb@gmail@com" };

            foreach (string testValue in testValues)
            {
                try
                {
                    this.Tested.get(testValue);
                    Assert.True(false, "Factory accepted wrong value.");
                }
                catch (InvalidEmailException){ }
            }
        }
        
        [Fact]
        public void CheckParsedValues()
        {
            Assert.True( this.Tested.get("aaabbb@student.polsl.pl")=="GRD", "Email wasn't recognized as graduate" );
            Assert.True( this.Tested.get("aaabbb@polsl.pl")=="PRO", "Email wasn't recognized as promoter");
        }

    }
}
