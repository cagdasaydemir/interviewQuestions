package user

import (
	"fill-labs_question4/database"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type User struct {
	gorm.Model

	Username   string `json:"username"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
}

func GetAllUsers(c *fiber.Ctx) {
	db := database.DBConn
	var users []User
	db.Find(&users)
	c.JSON(users)
}

func GetUser(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var user User
	db.Find(&user, id)
	c.JSON(user)
}

func NewUser(c *fiber.Ctx) {
	db := database.DBConn
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		c.Status(503).Send(err)
		return
	}
	db.Create(&user)
	c.JSON(user)
}

// func UpdateUser(c *fiber.Ctx) {
// 	id := c.Params("id")
// 	db := database.DBConn
// 	var user User
// 	db.Find(&user, id)
// 	user.Username = c.Params("username")
// 	user.Password = c.Params("password")
// 	user.Email = c.Params("email")
// 	user.First_name = c.Params("first_name")
// 	user.Last_name = c.Params("last_name")
// 	db.Update(&user)
// 	c.JSON(user)
// 	//Fix this
// }

func DeleteUser(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var user User
	db.First(&user, id)
	if id == "" {
		c.Status(500).Send("No user found with ID")
	}
	db.Delete(&user)
	c.Send("User Succesfully Deleted")
}
