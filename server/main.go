package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type GuideData struct {
	Type string
	Name string
	Url  string
}

func guide(w http.ResponseWriter, r *http.Request) {
	// 引导页
	fmt.Printf(r.URL.Query().Get("id"))

	var guideData GuideData
	guideData.Type = "external"
	guideData.Name = "baidu"
	guideData.Url = "https://baidu.com"
	backJson, err := json.Marshal(guideData)
	if err != nil {
		log.Fatalf("Error:", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(backJson)
}

func main() {
	http.HandleFunc("/guide", guide)
	http.ListenAndServe(":3900", nil)
}
