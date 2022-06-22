package main

import (
	"fill-labs_question4/database"
	"fill-labs_question4/user"
	"fmt"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func setupRoutes(app *fiber.App) {
	app.Get("api/v1/getAll", user.GetAllUsers)
	app.Get("/api/v1/get/:id", user.GetUser)
	app.Post("/api/v1/create", user.NewUser)
	// app.Patch("/api/v1/update/:id", user.UpdateUser)
	app.Delete("/api/v1/delete/:id", user.DeleteUser)

}

func initDatabase() {
	var err error
	database.DBConn, err = gorm.Open("sqlite3", "users.db")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection opened to database")
	database.DBConn.AutoMigrate(&user.User{})
	fmt.Println("Database Migrated !")
}

func main() {
	app := fiber.New()
	initDatabase()
	setupRoutes(app)
	app.Listen(3000)
	defer database.DBConn.Close()
}
