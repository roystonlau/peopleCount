package main

import (
	"scripting/scraper"

	"github.com/gin-gonic/gin"
)


func main() {
	router := gin.Default()
	scape:= scraper.Scrape()
	// Define a route
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"data": scape,
		})
	})
  
	// Start the server on port 8080
	router.Run(":8080")
}
