using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data.Lib;
using Backend.DatabaseModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralController : ControllerBase
    {
        protected DataContext db;
        protected IConfiguration Configuration;
        public GeneralController(IConfiguration _configuration, DataContext _db) : base()
        {
            this.db = _db;
            this.Configuration = _configuration;
        }

        [Authorize]
        [HttpGet]
        [Route("authorize")]
        public bool Authorize()
        {
            return true;
        }

    }
}
