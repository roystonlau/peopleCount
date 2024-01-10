package main

import (
	"fmt"
	"scripting/scraper"
	"time"

	"github.com/gin-gonic/gin"
)


func main() {
	router := gin.Default()
	var scape []scraper.MotorNews 
 go func() {
		scape= scraper.Scrape()
		time.Sleep(1 * time.Minute)
 }()
	// Define a route
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"data": scape,
		})
	})

	if len(scape) >0 {
		fmt.Print(scape)
	}
  
	// Start the server on port 8080
	router.Run(":7777")


}
