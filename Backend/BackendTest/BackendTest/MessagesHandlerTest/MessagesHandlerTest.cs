using System;
using Xunit;
using Backend.Lib.RequestHandlers;
using Backend.Models;
using Backend.Lib.RequestHandlers.Message;

namespace BackendTest.MessagesHandlerTest
{
    public class MessagesHandlerTest
    {
        IRequestHandler<bool, MessageDetails> TestHandler;

        public MessagesHandlerTest()
        {
            this.TestHandler = new MessagesHandler( new MockUserRepository(), new MockMessagesRepository() );
        }
        
        [Fact]
        public void SendMessage()
        {
            Assert.True(this.TestHandler.Handle( new MessageDetails() ), "Couldn't insert message to database");
        }
    }
}
