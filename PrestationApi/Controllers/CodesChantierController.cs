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
    public class CodesChantierController : ControllerBase
    {
        private readonly CodeChantierLogic _codeChantierLogic;

        public CodesChantierController(
            CodeChantierLogic codeChantierLogic
        )
        {
            _codeChantierLogic = codeChantierLogic;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<CodeChantier>> Get()
        {
            return _codeChantierLogic.GetAll().ToList();
        }

        // GET api/values/5
        [HttpGet("{code}")]
        public ActionResult<CodeChantier> Get(string code)
        {
            var cc = _codeChantierLogic.GetByCode(code);
            if (cc == null)
                return NotFound();

            return cc;
        }

        // POST api/values
        [HttpPost]
        public ActionResult<CodeChantier> Post([FromBody] CodeChantier newCc)
        {
            var cc = _codeChantierLogic.GetByCode(newCc.Code);

            if (cc != null)
                return this.BadRequest(new
                {
                    error = string.Format("The code `{0}` is already used", newCc.Code)
                });

            cc = _codeChantierLogic.Add(newCc.Code, newCc.Description);
            return CreatedAtAction("Get", new { code = newCc.Code }, cc);
        }

        // PUT api/values/5
        [HttpPut("{code}")]
        public ActionResult<CodeChantier> Put(string code, [FromBody] CodeChantier value)
        {
            var cc = _codeChantierLogic.GetByCode(code);
            if (cc == null)
                return this.NotFound();

            var otherCc = _codeChantierLogic.GetByCode(value.Code);
            if (otherCc != null && otherCc != cc)
                return this.BadRequest(new
                {
                    error = string.Format("The code `{0}` is already used", value.Code)
                });

            cc = _codeChantierLogic.Update(cc, value.Code, value.Description);
            return cc;

        }

        // DELETE api/values/5
        [HttpDelete("{code}")]
        public ActionResult Delete(string code)
        {
            var cc = _codeChantierLogic.GetByCode(code);
            if (cc == null)
                return this.NotFound();

            _codeChantierLogic.Delete(cc);
            return Ok();
        }
    }
}
