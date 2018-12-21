using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PrestationApi.Logic;
using PrestationApi.Models;

namespace PrestationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserLogic _userLogic;

        public UserController(
            UserLogic userLogic
        )
        {
            _userLogic = userLogic;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            return _userLogic.GetAll().ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var cc = _userLogic.GetById(id);
            if (cc == null)
                return NotFound();

            return cc;
        }

        // POST api/values
        [HttpPost]
        public ActionResult<User> Post([FromBody] User newUser)
        {
            var user = _userLogic.Add(newUser.Code, newUser.FirstName, newUser.LastName);
            return CreatedAtAction("Get", new { code = newUser.Id }, user);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ActionResult<User> Put(int id, [FromBody] User value)
        {
            var user = _userLogic.GetById(id);
            if (user == null)
                return this.NotFound();

            user = _userLogic.Update(user, value.Code, value.FirstName, value.LastName);
            return user;

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = _userLogic.GetById(id);
            if (user == null)
                return this.NotFound();

            _userLogic.Delete(user);
            return Ok();
        }
    }
}
