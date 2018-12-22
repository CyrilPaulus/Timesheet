using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using NPOI.OpenXmlFormats.Spreadsheet;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using PrestationApi.Models;


namespace PrestationApi.Logic
{


    public class ExcelExporterLogic
    {
        private readonly CodeChantierLogic _codeChantierLogic;

        public ExcelExporterLogic(CodeChantierLogic codeChantierLogiec)
        {
            _codeChantierLogic = codeChantierLogiec;
        }


        public MemoryStream ExportExcel(IQueryable<Prestation> prestationQuery, int year)
        {
            var prestations = prestationQuery.OrderBy(x => x.Date).ToList();

            var months = prestations.GroupBy(x => x.Date.Month);

            var ms = new MemoryStream();

            var workbook = new XSSFWorkbook();

            foreach (var month in months)
                this.AddMonth(month.Key, year, month, workbook);

            this.AddCodesChantier(workbook);
            workbook.Write(ms);
            byte[] file = ms.ToArray();
            ms = new MemoryStream();
            ms.Write(file, 0, file.Length);
            ms.Position = 0;

            return ms;
        }

        private void AddCodesChantier(XSSFWorkbook workbook)
        {
            var codesChantier = _codeChantierLogic.GetAll().ToList();
            var sheet = workbook.CreateSheet("Code chantier") as XSSFSheet;
            var headers = sheet.CreateRow(0);
            CreateCell(headers, 0, "Code Chantier");
            CreateCell(headers, 1, "Clients");
            CreateCell(headers, 2, "Produit");
            CreateCell(headers, 3, "Libellé");
            var rowIndex = 1;
            foreach (var codeChantier in codesChantier)
            {
                var row = sheet.CreateRow(rowIndex);
                CreateCell(row, 0, codeChantier.Code);
                CreateCell(row, 1, codeChantier.Client);
                CreateCell(row, 2, codeChantier.Produit);
                CreateCell(row, 3, codeChantier.Description);
                rowIndex++;
            }

            var table = sheet.CreateTable();
            var cttable = table.GetCTTable();
            var range = new AreaReference(new CellReference(0, 0), new CellReference(rowIndex - 1, 3));
            cttable.@ref = range.FormatAsString();
            cttable.tableColumns = new CT_TableColumns();
            cttable.tableColumns.tableColumn = new List<CT_TableColumn>();
            cttable.tableColumns.count = 4;
            cttable.displayName = "Chantier";
            cttable.name = "Chantier";
            cttable.id = 50;
            cttable.tableStyleInfo = new CT_TableStyleInfo();
            cttable.tableStyleInfo.name = "TableStyleMedium2";
            cttable.tableStyleInfo.showColumnStripes = false;
            cttable.tableStyleInfo.showRowStripes = true;
            cttable.tableStyleInfo.showFirstColumn = false;
            cttable.tableStyleInfo.showLastColumn = false;
            cttable.totalsRowShown = false;
            cttable.autoFilter = new CT_AutoFilter();
            cttable.autoFilter.@ref = range.FormatAsString();

            for (uint i = 0; i < 4; i++)
            {
                AddColumn(cttable, i);
                sheet.AutoSizeColumn((int)i);
            }



        }

        private void AddColumn(CT_Table table, uint index)
        {
            var column = new CT_TableColumn();
            column.name = "Column" + index;
            column.id = index + 1;
            table.tableColumns.tableColumn.Add(column);
        }

        private ICell CreateCell(IRow row, int index, string value)
        {
            var cell = row.CreateCell(index);
            cell.SetCellValue(value);
            return cell;
        }

        private void AddMonth(int month, int year, IEnumerable<Prestation> prestations, XSSFWorkbook workbook)
        {
            var sheetName = this.TranslateMonth(month) + " " + year;
            var sheet = workbook.CreateSheet(sheetName) as XSSFSheet;
            var header = sheet.CreateRow(0);
            CreateCell(header, 0, "Client");
            CreateCell(header, 1, "Produit");
            CreateCell(header, 2, "Code chantier");
            CreateCell(header, 3, "Libellé chantier");
            CreateCell(header, 4, "Description de la prestation");
            CreateCell(header, 5, "Durée");
            CreateCell(header, 6, "Personne");
            CreateCell(header, 7, "Date");
            CreateCell(header, 8, "Jour de la semaine");

            prestations = prestations.OrderBy(x => x.Date.Day);
            var rowIndex = 1;
            foreach (var prestation in prestations)
            {
                var row = sheet.CreateRow(rowIndex);
                CreateCell(row, 0, prestation.CodeChantier.Client);
                CreateCell(row, 1, prestation.CodeChantier.Produit);
                CreateCell(row, 2, prestation.CodeChantier.Code);
                CreateCell(row, 3, prestation.CodeChantier.Description);
                CreateCell(row, 4, prestation.Description);
                CreateCell(row, 5, (prestation.Duration / 60.0).ToString());
                CreateCell(row, 6, (prestation.User.Code));
                CreateCell(row, 7, (prestation.Date.ToString("dd-MM-yy")));
                CreateCell(row, 8, TranslateDayOfWeek(prestation.Date.DayOfWeek));
                rowIndex = rowIndex + 1;
            }

            var table = sheet.CreateTable();
            var cttable = table.GetCTTable();
            var range = new AreaReference(new CellReference(0, 0), new CellReference(rowIndex - 1, 8));
            cttable.@ref = range.FormatAsString();
            cttable.tableColumns = new CT_TableColumns();
            cttable.tableColumns.tableColumn = new List<CT_TableColumn>();
            cttable.tableColumns.count = 9;
            cttable.displayName = TranslateMonth(month);
            cttable.name = TranslateMonth(month);
            cttable.id = (uint)(10 + month);
            cttable.tableStyleInfo = new CT_TableStyleInfo();
            cttable.tableStyleInfo.name = "TableStyleMedium2";
            cttable.tableStyleInfo.showColumnStripes = false;
            cttable.tableStyleInfo.showRowStripes = true;
            cttable.tableStyleInfo.showFirstColumn = false;
            cttable.tableStyleInfo.showLastColumn = false;
            cttable.totalsRowShown = false;
            cttable.autoFilter = new CT_AutoFilter();
            cttable.autoFilter.@ref = range.FormatAsString();

            for (uint i = 0; i < 9; i++)
            {
                AddColumn(cttable, i);
                sheet.AutoSizeColumn((int)i);
            }
        }

        private string TranslateDayOfWeek(DayOfWeek day)
        {
            switch (day)
            {
                case DayOfWeek.Friday:
                    return "Vendredi";
                case DayOfWeek.Monday:
                    return "Lundi";
                case DayOfWeek.Saturday:
                    return "Samedi";
                case DayOfWeek.Sunday:
                    return "Dimanche";
                case DayOfWeek.Thursday:
                    return "Jeudi";
                case DayOfWeek.Tuesday:
                    return "Mardi";
                case DayOfWeek.Wednesday:
                    return "Mercredi";
            }
            return null;
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