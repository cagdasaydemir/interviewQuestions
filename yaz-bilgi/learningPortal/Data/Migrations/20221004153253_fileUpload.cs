using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace learningPortal.Data.Migrations
{
    public partial class fileUpload : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lecturer",
                table: "Courses",
                newName: "ImgUrl");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "341bd745-968c-47cf-a5eb-90bb6502e7ea");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "a4170d83-7194-4081-9f36-1ef4e0708c35");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImgUrl",
                table: "Courses",
                newName: "Lecturer");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "6bf8b58f-4c58-4314-9f2b-7a1eb72b8926");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "ea476db5-7435-4411-a67a-729aca5b62ad");
        }
    }
}
