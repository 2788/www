package controllers

import (
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
)

func assertEqual(t *testing.T, got, want interface{}) {
	t.Helper()
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got '%v' want '%v'", got, want)
	}
}

func TestResolvePaths(t *testing.T) {
	t.Run("empty str: ", func(t *testing.T) {
		paths := []string{""}
		gotFileNames, gotCdnPaths, err := resolvePaths(paths)
		assert.Nil(t, err)
		wantedFileNames := []string{""}
		wantedCdnPaths := []string{"/"}
		assertEqual(t, gotFileNames, wantedFileNames)
		assertEqual(t, gotCdnPaths, wantedCdnPaths)
	})
	t.Run("normal str list: ", func(t *testing.T) {
		paths := []string{"", "/foo", "/foo/bar"}
		gotFileNames, gotCdnPaths, err := resolvePaths(paths)
		assert.Nil(t, err)
		wantedFileNames := []string{"", "foo", "foo/", "foo/bar", "foo/bar/"}
		wantedCdnPaths := []string{"/", "/foo", "/foo/", "/foo/bar", "/foo/bar/"}
		assertEqual(t, gotFileNames, wantedFileNames)
		assertEqual(t, gotCdnPaths, wantedCdnPaths)
	})
}

func TestResolvePrefixPaths(t *testing.T) {
	t.Run("empty str: ", func(t *testing.T) {
		paths := []string{""}
		gotFileNames, gotFilePrefixes, gotCdnPaths, gotCdnDirs, err := resolvePrefixPaths(paths)
		assert.Nil(t, err)
		var wantedFileNames []string
		wantedFilePrefixes := []string{""}
		var wantedCdnPaths []string
		wantedCdnDirs := []string{"/"}
		assertEqual(t, gotFileNames, wantedFileNames)
		assertEqual(t, gotFilePrefixes, wantedFilePrefixes)
		assertEqual(t, gotCdnPaths, wantedCdnPaths)
		assertEqual(t, gotCdnDirs, wantedCdnDirs)
	})
	t.Run("normal str list: ", func(t *testing.T) {
		paths := []string{"", "/foo", "/foo/bar"}
		gotFileNames, gotFilePrefixes, gotCdnPaths, gotCdnDirs, err := resolvePrefixPaths(paths)
		assert.Nil(t, err)
		wantedFileNames := []string{"foo", "foo/bar"}
		wantedFilePrefixes := []string{"", "foo/", "foo/bar/"}
		wantedCdnPaths := []string{"/foo", "/foo/bar"}
		wantedCdnDirs := []string{"/", "/foo/", "/foo/bar/"}
		assertEqual(t, gotFileNames, wantedFileNames)
		assertEqual(t, gotFilePrefixes, wantedFilePrefixes)
		assertEqual(t, gotCdnPaths, wantedCdnPaths)
		assertEqual(t, gotCdnDirs, wantedCdnDirs)
	})
}
