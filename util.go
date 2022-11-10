package main

import "sync"

func MapValues[K comparable, V any](m map[K]V) []V {
	out := make([]V, 0, len(m))
	for _, v := range m {
		out = append(out, v)
	}
	return out
}

func ParallelMap[T, U any](ts []T, f func(T) (U, error)) ([]U, error) {
	// TODO use worker pool?
	out := make([]U, len(ts))
	var outErr error
	wg := sync.WaitGroup{}
	wg.Add(len(ts))
	for i, t := range ts {
		go func(i int, t T) {
			defer wg.Done()

			u, err := f(t)
			if err != nil {
				if outErr != nil {
					outErr = err
				}
			} else {
				out[i] = u
			}
		}(i, t)
	}
	wg.Wait()
	return out, outErr
}
