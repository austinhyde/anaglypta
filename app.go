package main

import (
	"context"
)

type App struct {
	ctx   context.Context
	roots map[string]Root
}

func NewApp() *App {
	return &App{
		roots: map[string]Root{},
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}
