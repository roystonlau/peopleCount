package scraper

import (
	"fmt"

	"github.com/gocolly/colly"
)


func Scrape()[]map[string]string {
	var myArray = []map[string]string{}
	
    c := colly.NewCollector(
        colly.AllowedDomains("hackerspaces.org", "wiki.hackerspaces.org"),
    )

    c.OnHTML("a[href]", func(e *colly.HTMLElement) {
        link := e.Attr("href")
		linkText:=e.Text
        fmt.Printf("Link found: %q -> %s\n", e.Text, link)
		myArray = append(myArray,map[string]string{linkText: link} )

		if len(myArray) <5 {

			c.Visit(e.Request.AbsoluteURL(link))
		}
    })

    c.OnRequest(func(r *colly.Request) {
        fmt.Println("Visiting", r.URL.String())
    })

    c.Visit("https://hackerspaces.org/")

	return myArray
}
