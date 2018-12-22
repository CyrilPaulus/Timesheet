using Microsoft.EntityFrameworkCore.Migrations;

namespace PrestationApi.Migrations
{
    public partial class AlterCodeChantierInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Client",
                table: "CodesChantier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Produit",
                table: "CodesChantier",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Client",
                table: "CodesChantier");

            migrationBuilder.DropColumn(
                name: "Produit",
                table: "CodesChantier");
        }
    }
}
