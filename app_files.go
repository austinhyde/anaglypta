package main

import (
	"image"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"

	"github.com/google/uuid"
	"go.uber.org/multierr"
)

type Root struct {
	ID   string
	Path string
}

type ImageFile struct {
	Root string
	Path string
	Type string
	Size []int
}

func (a *App) AddRoot(path string) {
	root := Root{
		ID:   uuid.New().String(),
		Path: path,
	}
	a.roots[root.ID] = root
}

func (a *App) RemoveRoot(id string) {
	delete(a.roots, id)
}

func (a *App) ListRoots() []Root {
	return MapValues(a.roots)
}

func (a *App) GetFiles() ([]ImageFile, error) {
	out := []ImageFile{}
	var outErr error
	m := sync.Mutex{}

	wg := sync.WaitGroup{}
	wg.Add(len(a.roots))
	for _, root := range a.roots {
		go func(root Root) {
			defer wg.Done()

			now := time.Now()
			files, err := getFiles(root.ID, root.Path)
			if err != nil {
				outErr = multierr.Append(outErr, err)
				return
			}

			m.Lock()
			defer m.Unlock()

			out = append(out, files...)

			log.Printf("fetch %d files in %s in %s", len(files), root.Path, time.Since(now))
		}(root)
	}
	wg.Wait()

	return out, outErr
}

func getFiles(id, root string) ([]ImageFile, error) {
	log.Printf("getFiles('%s')", root)

	files, err := listFiles(root)
	if err != nil {
		return nil, err
	}

	return ParallelMap(files, func(path string) (ImageFile, error) {
		f, err := os.Open(path)
		if err != nil {
			return ImageFile{}, err
		}
		defer f.Close()

		img, format, err := image.Decode(f)
		if err != nil {
			return ImageFile{}, err
		}

		bounds := img.Bounds()

		return ImageFile{
			Root: id,
			Path: strings.TrimPrefix(path, root+"/"),
			Type: format,
			Size: []int{bounds.Dx(), bounds.Dy()},
		}, nil
	})
}

func listFiles(root string) ([]string, error) {
	out := []string{}
	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			log.Printf("walkdir err: %v", err)
			return err
		}

		ext := strings.ToLower(filepath.Ext(path))
		if ext != ".jpg" && ext != ".jpeg" && ext != ".gif" && ext != ".png" {
			log.Printf("skip file '%s': %s", path, ext)
			return nil
		}

		out = append(out, path)
		return nil
	})
	return out, err
}
