using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace learningPortal.Data.Migrations
{
    public partial class lecturerEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lecturer",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "LecturerEnum",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lecturer",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "LecturerEnum",
                table: "Courses");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "c4354163-70d5-4bb9-8e95-459d12b3373e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "3550907a-6ee3-4845-836f-8afafee1dbc7");
        }
    }
}
