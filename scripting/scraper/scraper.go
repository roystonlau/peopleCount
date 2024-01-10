package scraper

import (
	"strings"

	"github.com/gocolly/colly"
)

type MotorNews struct {
	Time string
	Desc string
}

var previousFirst = []MotorNews{}

func Scrape() []MotorNews {
	// var result []MotorNews
	c := colly.NewCollector(
		colly.AllowedDomains("onemotoring.lta.gov.sg"),
	)

	c.OnHTML(".pie", func(e *colly.HTMLElement) {
		url := e.Request.URL.String()

    // Check which site the URL is from
    if strings.Contains(url, "onemotoring.lta.gov.sg") {
        // Handle elements from onemotoring.lta.gov.sg
        desc := e.ChildText(".traffic-updates__desc")
        time := e.ChildText(".traffic-updates__time")

        news := MotorNews{Desc: desc, Time: time}

        if len(previousFirst) > 0 && news == previousFirst[0] {
            return  
        }
        previousFirst = append(previousFirst, news)
    } else if strings.Contains(url, "channelnewsasia.com") {
        // Handle elements from channelnewsasia.com
        // Replace ".traffic-updates__desc" and ".traffic-updates__time" with the appropriate selectors for this site
        desc := e.ChildText(".selector-for-desc")
        time := e.ChildText(".selector-for-time")

        news := MotorNews{Desc: desc, Time: time}

        if len(previousFirst) > 0 && news == previousFirst[0] {
            return  
        }
        previousFirst = append(previousFirst, news)
    }
})
 

	err:= c.Visit("https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information/traffic_updates_and_road_closures.html")
	
	if err != nil {
		panic(err)
	}

	return previousFirst
}
