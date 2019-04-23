using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.DatabaseModels;
using Backend.Hubs;
using Backend.Lib;
using Backend.Lib.Repositories.Message;
using Backend.Lib.Repositories.User;
using Backend.Lib.RequestHandlers;
using Backend.Lib.RequestHandlers.Message;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : Controller
    {
        protected readonly IMessagesRepository MessagesRepository;
        protected readonly IUserRepository UserRepository;

        public MessagesController(DataContext _db) : base()
        {
            this.MessagesRepository = new GlobalMessagesRepository(_db);
            this.UserRepository = new UserRepository(_db);
        }

        [Authorize]
        [Route("send")]
        [HttpPost]
        public JsonResult SendMessage(MessageDetails details)
        {
            IRequestHandler<bool, MessageDetails> handler = new MessagesHandler(UserRepository, MessagesRepository);
            try
            {
                handler.Handle(details);
                return Json("");
            }
            catch(Exception e)
            {
                Response.StatusCode = 400;
                return Json(e.Message);
            }
        }

        [Authorize]
        [Route("conversation")]
        [HttpGet]
        public JsonResult GetConversation(int reciverId, int senderId)
        {
            IRequestHandler<List<MessageInfo>, ConversationUsers> handler = new GetConversationHandler(UserRepository, MessagesRepository);

            try
            {
                var converastion = handler.Handle(new ConversationUsers
                {
                    ReciverId = reciverId,
                    SenderId = senderId
                });
                return Json(converastion);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        [Authorize]
        [Route("graduates")]
        [HttpGet]
        public JsonResult GetAllGraduates()
        {
            Users currentUserDetails = this.UserRepository.Get(HttpContext.User.Identity.Name);
            Users[] conversationPartners;
            if (currentUserDetails.UserdetailsUser.Role == "PRO")
            {
                conversationPartners = this.MessagesRepository.GetGraduates(currentUserDetails.Id);
            }
            else
            {
                conversationPartners = new Users[1];
                conversationPartners[0] = this.UserRepository.Get(currentUserDetails.UserdetailsUser.Promoter.Email);
            }

            List<GraduateData> responseData = new List<GraduateData>();
            
            foreach(Users promoterGraduate in conversationPartners)
            {
                responseData.Add(new GraduateData {
                    UserId = promoterGraduate.Id,
                    Name = $"{promoterGraduate.UserdetailsUser.Name} {promoterGraduate.UserdetailsUser.LastName}",
                    Status = ChatHub._connections.IsConnected(promoterGraduate.Id) ? "Dostepny" : "Niedostepny",
                    EngineerWork = promoterGraduate.UserdetailsUser.EngineerWork,
                    ImageUrl = "no-image"
                });
            }

            return Json(responseData);
        }

    }
}