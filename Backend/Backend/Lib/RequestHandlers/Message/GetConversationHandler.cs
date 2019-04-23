using Backend.DatabaseModels;
using Backend.Lib.Repositories.Message;
using Backend.Lib.Repositories.User;
using Backend.Lib.RequestHandlers;
using Backend.Models;
using System.Collections.Generic;

namespace Backend.Controllers
{
    internal class GetConversationHandler : IRequestHandler<List<MessageInfo>, ConversationUsers>
    {
        private readonly IUserRepository UserRepository;
        private readonly IMessagesRepository MessagesRepository;

        public GetConversationHandler(IUserRepository userRepository, IMessagesRepository messagesRepository)
        {
            this.UserRepository = userRepository;
            this.MessagesRepository = messagesRepository;
        }

        public List<MessageInfo> Handle(ConversationUsers between)
        {
            Messages[] wholeConversation = MessagesRepository.GetConversation(between.SenderId, between.ReciverId);
            return this.ParseMessages(wholeConversation, between.SenderId);
        }

        private List<MessageInfo> ParseMessages(Messages[] messagesToParse, int RequestedId)
        {
            List<MessageInfo> parsedMessages = new List<MessageInfo>();
            foreach (Messages message in messagesToParse)
            {
                parsedMessages.Add(new MessageInfo
                {
                    Message = message.Message,
                    Date = message.Date,
                    IsMine = (message.SenderId == RequestedId)
                });
            }
            return parsedMessages;
        }
    }
}