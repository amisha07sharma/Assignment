package main

import (
	"io/ioutil"

	"log"

	"strings"

	"github.com/gin-gonic/gin"

	"github.com/jinzhu/gorm"

	_ "github.com/jinzhu/gorm/dialects/sqlite"

	"net/http"
)

type Human struct {
	ID      uint `gorm:"primary_key"`
	Name    string
	Message string
}

type CreateHumanInput struct {
	Name    string `json:"name" binding:"required"`
	Message string `json:"message" binding:"required"`
}

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open("sqlite3", "test.db")

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&Human{})

	DB = database
}

func PrintText(c *gin.Context) {

	text := c.Param("text")

	c.JSON(http.StatusOK, text)
}

func GetMessages(c *gin.Context) {

	var details []Human

	DB.Find(&details)

	c.JSON(http.StatusOK, details)
}

func CreatePerson(c *gin.Context) {
	var input CreateHumanInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	person := Human{Name: input.Name, Message: input.Message}
	DB.Create(&person)

	c.JSON(http.StatusOK, person)
}

func GetSelectedMessage(c *gin.Context) {

	var person []Human

	err := DB.Where("Name = ?", c.Param("Name")).Find(&person).Error
	if err != nil || len(person) == 0 {
		c.JSON(http.StatusBadRequest, "Record not found!")
		return
	}

	c.JSON(http.StatusOK, person)

}

func DeletePerson(c *gin.Context) {

	var person Human
	if err := DB.Where("ID = ?", c.Param("ID")).First(&person).Error; err != nil {
		c.JSON(http.StatusBadRequest, "Record not found!")
		return
	}

	DB.Delete(&person)

	c.JSON(http.StatusOK, gin.H{"data": true})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		header := c.Writer.Header()
		header.Set("Access-Control-Allow-Origin", "http://localhost:8081")

		header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")

		header.Set("Access-Control-Allow-Headers",
			"Access-Control-Allow-Origin, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
	}
}

func main() {

	router := gin.Default()

	router.Use(CORSMiddleware())

	router.POST("/save/:text", PrintText)

	ConnectDatabase()

	content, err := ioutil.ReadFile("TextFile.txt")
	if err != nil {
		log.Fatal(err)
	}

	splitText := strings.Split(string(content), "/n")

	for index := range splitText {
		endpointURL := "/save/" + splitText[index]
		router.POST(endpointURL, PrintText)
	}

	router.POST("/message", CreatePerson)

	router.GET("/message/:Name", GetSelectedMessage)

	router.GET("/message", GetMessages)

	router.DELETE("/deletemessage/:ID", DeletePerson)

	router.Run(":8080")
}

// TDD
// struct -- sender name, message, date
// /readmessage/{name} -- give the message of name, otherwise proper error message
// should support the order by date
// docker
// 1.sql query not gorm
//create react project : list of person (name, message)
//add/create button to add more -- recall api , refresh
// why OPTIONS call ?

// split into 2 pages, without reloading the window
// test cases
//validations name -- only alphabets and message -- alphabets and numbers
// use hooks
// style components library -- material ui and all
// use flex instead of table
// git
//docker
// deleting the message
