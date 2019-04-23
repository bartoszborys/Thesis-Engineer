using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DatabaseModels;
using Backend.Lib.Repositories.GlobalMessages;
using Backend.Lib.Repositories.User;
using Backend.Lib;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GlobalMessagesController : Controller
    {
        private readonly IGlobalMessagesRepository globalMessagesRepository;
        private readonly IUserRepository userRepository;

        public GlobalMessagesController(DataContext context)
        {
            this.globalMessagesRepository = new GlobalMessagesRepository(context);
            this.userRepository = new UserRepository(context);
        }


        // GET: api/GlobalMessages
        [HttpGet]
        public JsonResult GetGlobalmessages()
        {
            UserClaimsReader reader = new UserClaimsReader(HttpContext.User);
            int currentUserId = reader.GetId();
            Users user = this.userRepository.Get(currentUserId);
            int promoterId;
            if(user.UserdetailsUser.Role != "PRO")
            {
                promoterId = user.UserdetailsUser.PromoterId.Value;
            }
            else
            {
                promoterId = currentUserId;
            }


            List<Globalmessages> results = globalMessagesRepository.Get(promoterId);
            List<Globalmessages> toSend = new List<Globalmessages>();

            foreach( Globalmessages result in results)
            {
                result.Sender = null;
                result.Type = null;
                toSend.Add(result);
            }

            return Json(toSend);
        }
        
        [HttpPut]
        public JsonResult InsertGlobalmessages(Globalmessages newMessage)
        {
            if(newMessage == null)
            {
                return Json(BadRequest());
            }

            try
            {
                newMessage.SenderId = new UserClaimsReader(HttpContext.User).GetId();
                this.globalMessagesRepository.Put(newMessage);
                return Json(Ok());
            }
            catch(Exception e)
            {
                Response.StatusCode = 500;
                return Json("");
            }
        }

        [HttpPatch]
        public JsonResult UpdateGlobalmessages(Globalmessages newMessage)
        {
            if (newMessage == null)
            {
                return Json(BadRequest());
            }

            try
            {
                this.globalMessagesRepository.Patch(newMessage);
                return Json(Ok());
            }
            catch (Exception e)
            {
                Response.StatusCode = 500;
                return Json("");
            }
        }

        [HttpDelete("{messageId}")]
        public JsonResult DeleteGlobalmessage([FromRoute] int messageId)
        {
            try
            {
                this.globalMessagesRepository.Delete(messageId);
                return Json(Ok());
            }
            catch (Exception e)
            {
                Response.StatusCode = 500;
                return Json("");
            }
        }
    }
}