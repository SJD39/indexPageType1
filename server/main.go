package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type GuideData struct {
	Type string
	Name string
	Url  string
}

func guide(w http.ResponseWriter, r *http.Request) {
	var guideData [6]GuideData
	guideData[0].Type = "external"
	guideData[0].Name = "baidu"
	guideData[0].Url = "https://baidu.com"

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
