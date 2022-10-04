using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace learningPortal.Data.Migrations
{
    public partial class multipleFileUploadFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "URL",
                table: "CourseFiles",
                newName: "FileURL");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "fa6fed02-7724-407b-b69f-22bd3b3908ee");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "50f00fa6-8929-4ca4-b64d-ba4923a86eda");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FileURL",
                table: "CourseFiles",
                newName: "URL");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "b9a1ceff-df71-49e3-a523-ff467f454a29");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "cf1e9103-03cd-44dc-bf86-7e61497ffeb3");
        }
    }
}
