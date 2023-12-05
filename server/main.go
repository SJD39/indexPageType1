package main

import (
	"fmt"
	"net/http"
)

func manage(w http.ResponseWriter, r *http.Request) {
	// 后台管理
	// 检查cookie
	credential, err := r.Cookie("credential")
	if err != nil {
		fmt.Fprintln(w, "Cookie 不存在")
		return
	}
	fmt.Printf(credential.Value)
}

func guide(w http.ResponseWriter, r *http.Request) {
	// 引导页
	fmt.Printf(r.URL.Query().Get("type"))
}

func main() {
	http.HandleFunc("/guide", guide)
	http.HandleFunc("/manage", manage)
	http.ListenAndServe(":3900", nil)
}
