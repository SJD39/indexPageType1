package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type GuideData struct {
	Id   uint8
	Type string
	Name string
	Url  string
}

func guide(w http.ResponseWriter, r *http.Request) {
	var guideData [6]GuideData
	guideData[0].Id = 0
	guideData[0].Type = "external"
	guideData[0].Name = "baidu"
	guideData[0].Url = "https://baidu.com"

	guideData[1].Id = 1
	guideData[1].Type = "here"
	guideData[1].Name = "反应速度测试"
	guideData[1].Url = "https://reaction.cysm.icu/"

	guideData[2].Id = 2
	guideData[3].Id = 3
	guideData[4].Id = 4
	guideData[5].Id = 5

	backJson, err := json.Marshal(guideData)
	if err != nil {
		log.Fatalf("Error:", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(backJson)
}

func main() {
	http.HandleFunc("/guide", guide)
	http.ListenAndServe(":3900", nil)
}
