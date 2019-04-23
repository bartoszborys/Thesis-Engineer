using Backend.DatabaseModels;
using Backend.Lib.Repositories.Message;
using Backend.Lib.Repositories.User;
using Backend.Models;
using System;

namespace Backend.Lib.RequestHandlers.Message
{
    public class MessagesHandler : IRequestHandler<bool, MessageDetails>
    {
        private IMessagesRepository MessagesRepository;
        private IUserRepository UserRepository;

        public MessagesHandler(IUserRepository _userRepository, IMessagesRepository _messagesRepository)
        {
            this.MessagesRepository = _messagesRepository;
            this.UserRepository = _userRepository;
        }

        public bool Handle(MessageDetails parameters)
        {
            Messages Message = new Messages
            {
                SenderId = parameters.Sender,
                ReciverId = parameters.Reciver,
                Message = parameters.Message,
                Date = DateTime.Now
            };
            return MessagesRepository.Insert(Message);
        }
    }
}