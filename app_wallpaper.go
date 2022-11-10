package main

import (
	"log"
	"path/filepath"

	"github.com/reujab/wallpaper"
)

func (a *App) SetWallpaper(rootID, path string) error {
	log.Printf("SetWallpaper(%s, %s)", rootID, path)
	return wallpaper.SetFromFile(filepath.Join(a.roots[rootID].Path, path))
}
