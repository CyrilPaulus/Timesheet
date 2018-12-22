using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using NPOI.XSSF.UserModel;
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

        public CodeChantier Update(CodeChantier cc, string code, string description, string client, string produit)
        {
            if (cc.Code != code)
            {
                Delete(cc);
                cc = Add(code, description, client, produit, false);
            }

            cc.Description = description;
            cc.Client = client;
            cc.Produit = produit;
            _db.SaveChanges();
            return cc;
        }

        public void Delete(CodeChantier cc)
        {
            _db.CodesChantier.Remove(cc);
            _db.SaveChanges();
        }

        public CodeChantier Add(string code, string description, string client, string produit, bool commit = true)
        {
            var cc = new CodeChantier();
            cc.Code = code;
            cc.Description = description;
            cc.Client = client;
            cc.Produit = produit;
            cc.CreationDate = DateTime.UtcNow;
            _db.CodesChantier.Add(cc);

            if (commit)
                _db.SaveChanges();
            return cc;
        }

        public IEnumerable<CodeChantier> ImportExcel(Stream ms)
        {
            var rtn = new List<CodeChantier>();
            var workbook = new XSSFWorkbook(ms);
            var sheet = workbook.GetSheet("Code chantier");

            //Detect column index;
            var columnMap = new Dictionary<string, int>();
            var headers = sheet.GetRow(0);
            for (var i = 0; i < 4; i++)
            {
                var cell = headers.GetCell(i);
                columnMap[cell.ToString()] = i;
            }

            var finished = false;
            var rowIndex = 1;
            while (!finished)
            {
                var row = sheet.GetRow(rowIndex);

                if (row == null)
                {
                    finished = true;
                    break;
                }

                var code = row.GetCell(columnMap["Code Chantier"]).ToString();
                var client = row.GetCell(columnMap["Clients"]).ToString();
                var produit = row.GetCell(columnMap["Produit"]).ToString();
                var description = row.GetCell(columnMap["Libellé"]).ToString();

                if (string.IsNullOrWhiteSpace(code))
                    continue;

                var cc = _db.CodesChantier.Find(code);
                if (cc != null)
                    cc = this.Update(cc, code, description, client, produit);
                else
                    cc = this.Add(code, description, client, produit);
                rtn.Add(cc);
                rowIndex++;
            }

            return rtn;
        }

    }

}