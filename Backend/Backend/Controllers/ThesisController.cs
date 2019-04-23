using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Backend.DatabaseModels;
using Backend.Lib;
using Backend.Lib.Repositories.ThesisData;
using Backend.Lib.Repositories.User;
using Backend.Lib.ThesisFiles;
using Backend.Models.FrontendIntegrationModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ThesisController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly IThesisRepository thesisRepository;

        public ThesisController(DataContext context)
        {
            this.userRepository = new UserRepository(context);
            this.thesisRepository = new ThesisRepository(context);
        }

        [HttpGet("{graduate_id}")]
        public IActionResult GetThesis([FromRoute] int graduate_id)
        {
            Thesis thesis = this.thesisRepository.Get(graduate_id);

            if(thesis == null)
            {
                return NoContent();
            }

            List<ThesisComment> parsedComments = new List<ThesisComment>();

            foreach( ThesisComments comment in thesis.ThesisComments)
            {
                parsedComments.Add(new ThesisComment
                {
                    text = comment.Message,
                    date = comment.Date
                });
            }

            ThesisDetails details = new ThesisDetails
            {
                thesisName = thesis.Graduate.UserdetailsUser.EngineerWork,
                stateName = thesis.State.Name,
                promoterFile = null,
                graduateFile = null,
                lastActionDate = thesis.LastAction,
                comments = parsedComments,
                ThesisGrade = thesis.ThesisGrade,
                DefenseGrade = thesis.DefenseGrade,
                StudyGrade = thesis.StudyGrade
            };

            return Ok( details );
        }

        [HttpPut]
        public IActionResult GenerateThesis()
        {
            UserClaimsReader reader = new UserClaimsReader(HttpContext.User);
            int id = reader.GetId();
            Users callerDetails = this.userRepository.Get(id);

            if( callerDetails.UserdetailsUser.PromoterId == null)
            {
                return BadRequest("Please choose your promoter in settings section");
            }

            if( callerDetails.UserdetailsUser.EngineerWork == null)
            {
                return BadRequest("Please name your thesis in settings section");
            }

            if( callerDetails == null)
            {
                return BadRequest("User with given id is not exists");
            }

            if(callerDetails.UserdetailsUser.Role == "PRO")
            {
                return BadRequest("User is promoter");
            }

            this.thesisRepository.Put(callerDetails);
            return Ok();
        }

        [HttpGet]
        [Route("graduates")]
        public IActionResult GetPromoterGraduates()
        {
            int currentUserId = new UserClaimsReader(HttpContext.User).GetId();
            Users currentPromoter = this.userRepository.Get(currentUserId);
            if(currentPromoter.UserdetailsUser.Role != "PRO")
            {
                return BadRequest("You don't have a premissons");
            }

            List<ThesisListDetails> responseData = new List<ThesisListDetails>();
            foreach(Thesis currentThesis in this.thesisRepository.GetGraduatesThesis(currentPromoter) )
            {
                responseData.Add(new ThesisListDetails
                {
                    GraduateId = currentThesis.Graduate.Id,
                    UserName = $"{currentThesis.Graduate.UserdetailsUser.Name} {currentThesis.Graduate.UserdetailsUser.LastName}",
                    StateName = currentThesis.State.Name,
                    LastActionDate = currentThesis.LastAction,
                    FinallyGrade = currentThesis.FinalGrade,
                });
            }

            return Ok(responseData);
        }


        [HttpPost]
        [Route("upload")]
        public IActionResult UploadGraduate([FromBody] UploadedFile uploadedData)
        {
            int currentUserId = new UserClaimsReader(HttpContext.User).GetId();
            ThesisFile file = new ThesisFile();
            file.PreparePath(currentUserId);
            string thesisPath = file.GetPath(currentUserId, "GRD");

            string Base64Header = uploadedData.Base64WithHeader.Substring(0, uploadedData.Base64WithHeader.IndexOf(','));
            string CleanBase64 = uploadedData.Base64WithHeader.Replace($"{Base64Header},", "");

            FileStream F = System.IO.File.Create(thesisPath);
            foreach ( byte currentByte in Convert.FromBase64String(CleanBase64) )
            {
                F.WriteByte(currentByte);
            }
            F.Close();

            this.thesisRepository.ChangeState(currentUserId, "CHK");

            return Ok();
        }

        [HttpPost]
        [Route("upload/{graduate_id}")]
        public IActionResult UploadPromoter([FromRoute] int graduate_id, [FromBody] UploadedFile uploadedData)
        {
            int currentUserId = new UserClaimsReader(HttpContext.User).GetId();

            if( this.userRepository.Get(currentUserId).UserdetailsUser.Role != "PRO" )
            {
                return BadRequest();
            }

            ThesisFile file = new ThesisFile();
            file.PreparePath(graduate_id);
            string thesisPath = file.GetPath(graduate_id, "PRO");

            string Base64Header = uploadedData.Base64WithHeader.Substring(0, uploadedData.Base64WithHeader.IndexOf(','));
            string CleanBase64 = uploadedData.Base64WithHeader.Replace($"{Base64Header},", "");

            FileStream F = System.IO.File.Create(thesisPath);
            foreach (byte currentByte in Convert.FromBase64String(CleanBase64))
            {
                F.WriteByte(currentByte);
            }
            F.Close();
            
            return Ok();
        }

        [HttpGet]
        [Route("download/{role}")]
        public IActionResult DownloadFileGraduate([FromRoute] string role)
        {
            int currentUserId = new UserClaimsReader(HttpContext.User).GetId();
            Users currentUser = this.userRepository.Get(currentUserId);

            if (currentUser.UserdetailsUser.Role != "GRD")
            {
                return BadRequest("You don't have premissons");
            }

            ThesisFile file = new ThesisFile();
            string thesisPath = file.GetPath(currentUserId, role);

            if (!System.IO.File.Exists(thesisPath))
            {
                return BadRequest("File not exists");
            }

            FileContentResult result = new FileContentResult(System.IO.File.ReadAllBytes(thesisPath), "application/pdf");
            return Ok(result);
        }

        [HttpGet]
        [Route("download/{graduate_id}/{role}")]
        public IActionResult DownloadMyFile([FromRoute] int graduate_id, [FromRoute] string role)
        {
            int currentUserId = new UserClaimsReader(HttpContext.User).GetId();
            Users currentUser = this.userRepository.Get(currentUserId);

            if (currentUser.UserdetailsUser.Role != "PRO")
            {
                return BadRequest("You don't have premissons");
            }

            ThesisFile file = new ThesisFile();
            string thesisPath = file.GetPath(graduate_id, role);

            if (!System.IO.File.Exists(thesisPath))
            {
                return BadRequest("File not exists");
            }

            FileContentResult result = new FileContentResult(System.IO.File.ReadAllBytes(thesisPath), "application/pdf");
            return Ok(result);
        }

        [HttpPatch]
        [Route("state/{graduate_id}/{to}")]
        public IActionResult ChangeThesisStateTo([FromRoute] int graduate_id, [FromRoute] string to)
        {
            int currentUserId = new UserClaimsReader(HttpContext.User).GetId();
            Users currentUser = this.userRepository.Get(currentUserId);

            if(currentUser.UserdetailsUser.Role != "PRO")
            {
                return BadRequest();
            }

            try
            {
                this.thesisRepository.ChangeState(graduate_id, to);
                return Ok();
            }
            catch(NotImplementedException)
            {
                return BadRequest();
            }
        }

        [HttpPatch]
        [Route("grade/{graduate_id}")]
        public IActionResult ChangeGrades([FromRoute] int graduate_id, [FromBody] ThesisGrades grades)
        {
            try
            {
                this.thesisRepository.UpdateGrades(graduate_id, grades);
                return Ok();
            }
            catch (NotImplementedException)
            {
                return BadRequest("Wrong saved changes count");
            }
        }

        [HttpPut]
        [Route("comment/{graduate_id}")]
        public IActionResult AddComment([FromRoute] int graduate_id, [FromBody] ThesisComment comment)
        {
            try
            {
                int currentUserId = new UserClaimsReader(HttpContext.User).GetId();
                this.thesisRepository.InsertComment(graduate_id, currentUserId, comment);
                return Ok();
            }
            catch(NotImplementedException)
            {
                return BadRequest("Error during insert message");
            }
        }
    }
}