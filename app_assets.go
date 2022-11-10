package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func (a *App) assetHandler() http.Handler {
	m := http.NewServeMux()
	m.Handle("/image/", http.StripPrefix("/image/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id, path, ok := strings.Cut(r.URL.Path, "/")
		if !ok {
			w.WriteHeader(404)
			log.Printf("invalid file: %s", r.URL.Path)
			return
		}

		root := a.roots[id].Path
		f, err := os.Open(filepath.Join(root, path))
		if err != nil {
			w.WriteHeader(500)
			log.Printf("error serving file '%s': %v", path, err)
			return
		}
		defer f.Close()

		info, err := f.Stat()
		if err != nil {
			w.WriteHeader(500)
			log.Printf("error statting file '%s': %v", path, err)
			return
		}

		http.ServeContent(w, r, path, info.ModTime(), f)
	})))

	return m
}
