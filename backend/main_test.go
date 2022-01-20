package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestGetMethod(t *testing.T) {

	gin.SetMode(gin.TestMode)

	r := gin.Default()

	ConnectDatabase()

	r.GET("/readmessage/Amisha", GetSelectedMessage)

	req, err := http.NewRequest(http.MethodGet, "/readmessage/Amisha", nil)

	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}

	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code == http.StatusOK {
		t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
	} else {
		t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
	}
}

func TestPostMethod(t *testing.T) {

	gin.SetMode(gin.TestMode)

	r := gin.Default()

	ConnectDatabase()

	r.POST("/person", CreatePerson)

	req, err := http.NewRequest(http.MethodPost, "/person", nil)

	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}

	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	fmt.Println(w.Body)

	if w.Code == http.StatusOK {
		t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
	} else {
		t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
	}
}
func TestDeleteMethod(t *testing.T) {

	gin.SetMode(gin.TestMode)

	r := gin.Default()

	ConnectDatabase()

	r.DELETE("/deleteperson/:ID", CreatePerson)

	req, err := http.NewRequest(http.MethodPost, "/deleteperson/:ID", nil)

	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}

	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	fmt.Println(w.Body)

	if w.Code == http.StatusOK {
		t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
	} else {
		t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
	}
}
