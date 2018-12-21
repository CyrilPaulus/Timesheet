using System;
using System.Linq;
using PrestationApi.Models;

namespace PrestationApi.Logic
{


    public class CodeChantierLogic
    {
        private readonly PrestationDbContext _db;

        public CodeChantierLogic(PrestationDbContext db)
        {
            _db = db;
        }

        public CodeChantier GetByCode(string code)
        {
            return _db.CodesChantier.Find(code);
        }

        public IQueryable<CodeChantier> GetAll()
        {
            return _db.CodesChantier.AsQueryable();
        }

        public CodeChantier Update(CodeChantier cc, string code, string description)
        {
            if (cc.Code != code)
            {
                Delete(cc);
                cc = Add(code, description, false);
            }

            cc.Description = description;
            _db.SaveChanges();
            return cc;
        }

        public void Delete(CodeChantier cc)
        {
            _db.CodesChantier.Remove(cc);
            _db.SaveChanges();
        }

        public CodeChantier Add(string code, string description, bool commit = true)
        {
            var cc = new CodeChantier();
            cc.Code = code;
            cc.Description = description;
            cc.CreationDate = DateTime.UtcNow;
            _db.CodesChantier.Add(cc);

            if (commit)
                _db.SaveChanges();
            return cc;
        }

    }

}