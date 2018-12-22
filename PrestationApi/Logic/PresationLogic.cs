using System;
using System.Linq;
using PrestationApi.Models;

namespace PrestationApi.Logic
{
    public class PresationLogic
    {
        private readonly PrestationDbContext _db;

        public PresationLogic(PrestationDbContext db)
        {
            _db = db;
        }

        public Prestation GetById(int id)
        {
            return _db.Prestations.Find(id);
        }

        public IQueryable<Prestation> GetAll()
        {
            return _db.Prestations.AsQueryable();
        }

        public Prestation Update(Prestation prestation, string code, DateTime date, int duration, string description)
        {
            prestation.CodeChantierId = code;
            prestation.Date = date;
            prestation.Duration = duration;
            prestation.Description = description;

            _db.SaveChanges();
            return prestation;
        }

        public void Delete(Prestation prestation)
        {
            _db.Prestations.Remove(prestation);
            _db.SaveChanges();
        }

        public Prestation Add(string code, int userId, DateTime date, int duration, string description, bool commit = true)
        {
            var prestation = new Prestation();
            prestation.UserId = userId;
            prestation.CodeChantierId = code;
            prestation.Date = date;
            prestation.Duration = duration;
            prestation.Description = description;
            _db.Prestations.Add(prestation);

            if (commit)
                _db.SaveChanges();
            return prestation;
        }

    }

}