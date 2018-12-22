using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using NPOI.XSSF.UserModel;
using PrestationApi.Models;


namespace PrestationApi.Logic
{


    public class ExcelExporterLogic
    {


        public MemoryStream ExportExcel(IQueryable<Prestation> prestationQuery)
        {
            var prestations = prestationQuery.OrderBy(x => x.Date).ToList();

            var months = prestations.GroupBy(x => x.Date.Month);

            var ms = new MemoryStream();

            var workbook = new XSSFWorkbook();

            foreach (var month in months)
                this.AddMonth(month.Key, month, workbook);

            this.AddCodesChantier(prestations, workbook);

            byte[] file = ms.ToArray();
            ms = new MemoryStream();
            ms.Write(file, 0, file.Length);
            ms.Position = 0;

            return ms;
        }

        private void AddCodesChantier(List<Prestation> prestations, XSSFWorkbook workbook)
        {
            var codesChantiers = prestations.Select(x => x.CodeChantier).Distinct().OrderBy(x => x.Code);
        }

        private void AddMonth(int month, IEnumerable<Prestation> prestations, XSSFWorkbook workbook)
        {

        }

        private string TranslateMonth(int month)
        {
            switch (month)
            {
                case 1:
                    return "Janvier";
                case 2:
                    return "Février";
                case 3:
                    return "Mars";
                case 4:
                    return "Avril";
                case 5:
                    return "Mai";
                case 6:
                    return "Juin";
                case 7:
                    return "Juillet";
                case 8:
                    return "Août";
                case 9:
                    return "Septembre";
                case 10:
                    return "Octobre";
                case 11:
                    return "Novembre";
                case 12:
                    return "Décembre";
            }

            return null;
        }
    }

}