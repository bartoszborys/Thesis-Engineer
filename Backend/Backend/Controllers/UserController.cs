using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data.Lib;
using Backend.DatabaseModels;
using Backend.Exceptions;
using Backend.Exceptions.Login;
using Backend.Lib;
using Backend.Lib.Exceptions;
using Backend.Lib.Repositories.User;
using Backend.Lib.RequestHandlers;
using Backend.Lib.RequestHandlers.Login;
using Backend.Lib.RequestHandlers.Registration;
using Backend.Lib.RequestHandlers.UserdetaisUpdate;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        protected string TokenSecret;
        protected IUserRepository userRepository;
        
        public UserController(IConfiguration _configuration, DataContext _db) : base()
        {
            this.TokenSecret = _configuration.GetSection("TokenAuthorization:Secret").Value;
            this.userRepository = new UserRepository(_db);
        }

        [Route("registration")]
        [HttpPost]
        public JsonResult Registration(UserCredentials registrationData)
        {
            IRequestHandler<bool, UserCredentials> handler = new RegistrationHandler(userRepository, TokenSecret);
            
            try
            {
                return Json( handler.Handle(registrationData) );
            }
            catch(InvalidEmailException e)
            {
                Response.StatusCode = 400;
                return Json("Email has invalid domain.");
            }
            catch(RegistrationException e)
            {
                Response.StatusCode = 400;
                return Json(e.Message);
            }
        }

        [Route("login")]
        [HttpPost]
        public JsonResult Login(UserCredentials credentials)
        {
            IRequestHandler<JWT, UserCredentials> handler = new LoginHandler(userRepository, TokenSecret);

            try
            {
                return Json( handler.Handle(credentials) );
            }
            catch(InvalidCredentialsException)
            {
                Response.StatusCode = 400;
            }
            catch(InvalidOperationException)
            {
                Response.StatusCode = 500;
            }

            return Json("");
        }

        [Authorize]
        [HttpGet]
        [Route("")]
        [Route("{id}")]
        public JsonResult GetUsers(int? id)
        {
            UserClaimsReader reader = new UserClaimsReader(HttpContext.User);
            int requestId = (id == null) ? reader.GetId() : id.GetValueOrDefault();
            Userdetails details = this.userRepository.Get(requestId).UserdetailsUser;
            details.UserId = 0;
            details.Promoter = null;
            details.User = null;
            return Json(details);
        }

        [Authorize]
        [HttpGet]
        [Route("promoters")]
        public JsonResult GetPromoters()
        {
            List<DropdownDetails> details = new List<DropdownDetails>();
            foreach (Users currentPromoter in this.userRepository.GetPromoters())
            {
                DropdownDetails promoter = new DropdownDetails();
                promoter.id = currentPromoter.Id.ToString();
                promoter.name = $"{currentPromoter.UserdetailsUser.Name} {currentPromoter.UserdetailsUser.LastName} <{currentPromoter.Email}>";
                details.Add(promoter);
            };
            return Json(details);
        }

        [Authorize]
        [HttpGet]
        [Route("studyFields")]
        public JsonResult GetStudyFields()
        {
            List<DropdownDetails> details = new List<DropdownDetails>();
            foreach (Studyfields field in this.userRepository.GetStudyFields())
            {
                DropdownDetails promoter = new DropdownDetails();
                promoter.id = field.Id;
                promoter.name = $"{field.Faculty} — {field.Name}";
                details.Add(promoter);
            };
            return Json(details);
        }

        [Authorize]
        [HttpPatch]
        [Route("changePassword")]
        public void ChangePassword(PasswordChangeDetails details)
        {
            string callerEmail = HttpContext.User.Identity.Name;
            Users currentUser = this.userRepository.Get(callerEmail);
            Scrypt.ScryptEncoder encoder = new Scrypt.ScryptEncoder();
            if(!encoder.Compare(currentUser.SafetySalt + details.OldPassword, currentUser.Passwords.SensitivePassword))
            {
                Response.StatusCode = 400;
                return;
            }

            string newHashedPassword = currentUser.Passwords.SensitivePassword = encoder.Encode(currentUser.SafetySalt + details.NewPassword);
            this.userRepository.ChangeUserPassword(newHashedPassword, callerEmail);
        }

        [Authorize]
        [HttpPatch]
        public JsonResult Update(Userdetails details)
        {
            string callerEmail = HttpContext.User.Identity.Name;
            IRequestHandler<bool, Userdetails> handler = new UserdetaisUpdateHandler(this.userRepository, callerEmail);
            string ResultMessage = "";

            try
            {
                handler.Handle(details);
            }
            catch(InvalidUserDetailException e)
            {
                Response.StatusCode = 400;
                ResultMessage = e.Message;
            }
            return Json(ResultMessage);
        }
    }
}
