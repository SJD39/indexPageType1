package main

import (
	"fmt"
	"net/http"
)

func manage(w http.ResponseWriter, r *http.Request) {

}

func guide(w http.ResponseWriter, r *http.Request) {
	fmt.Printf(r.URL.Query().Get("type"))
}

func main() {
	http.HandleFunc("/guide", guide)
	http.HandleFunc("/manage", manage)
	http.ListenAndServe(":3900", nil)
}
