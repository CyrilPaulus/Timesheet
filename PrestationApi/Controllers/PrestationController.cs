using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PrestationApi.Logic;
using PrestationApi.Models;

namespace PrestationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestationController : ControllerBase
    {
        private readonly PresationLogic _prestationLogic;
        private readonly ExcelExporterLogic _excelExporterLogic;
        private readonly UserLogic _userLogic;
        public PrestationController(
            PresationLogic prestationLogic,
            ExcelExporterLogic excelExporterLogic,
            UserLogic userLogic
        )
        {
            _prestationLogic = prestationLogic;
            _excelExporterLogic = excelExporterLogic;
            _userLogic = userLogic;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Prestation>> Get()
        {
            return _prestationLogic.GetAll().ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Prestation> Get(int id)
        {
            var cc = _prestationLogic.GetById(id);
            if (cc == null)
                return NotFound();

            return cc;
        }

        [HttpGet("user/{userId}/{year}/{month}")]
        public ActionResult<IEnumerable<Prestation>> GetUserMonth(int userId, int year, int month, int id)
        {
            var prestations = _prestationLogic.GetAll();

            prestations = prestations.Where(x => x.UserId == userId);
            prestations = prestations.Where(x => x.Date.Year == year && x.Date.Month == month);

            return prestations.ToList();
        }

        [HttpGet("export/{userId}/{year}")]
        public ActionResult Export(int userId, int year)
        {
            var user = _userLogic.GetById(userId);
            var prestations = _prestationLogic.GetAll();


            prestations = prestations.Where(x => x.UserId == userId);
            prestations = prestations.Where(x => x.Date.Year == year);


            var memory = _excelExporterLogic.ExportExcel(prestations, year);
            var filename = string.Format("{0}_Prestations_{1}.xlsx", user.Code, year);
            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
        }

        // POST api/values
        [HttpPost]
        public ActionResult<Prestation> Post([FromBody] Prestation newPrestation)
        {
            var user = _prestationLogic.Add(newPrestation.CodeChantierId, newPrestation.UserId, newPrestation.Date, newPrestation.Duration, newPrestation.Description);
            return CreatedAtAction("Get", new { code = newPrestation.Id }, user);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ActionResult<Prestation> Put(int id, [FromBody] Prestation value)
        {
            var prestation = _prestationLogic.GetById(id);
            if (prestation == null)
                return this.NotFound();

            prestation = _prestationLogic.Update(prestation, value.CodeChantierId, value.Date, value.Duration, value.Description);
            return prestation;

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = _prestationLogic.GetById(id);
            if (user == null)
                return this.NotFound();

            _prestationLogic.Delete(user);
            return Ok();
        }
    }
}
