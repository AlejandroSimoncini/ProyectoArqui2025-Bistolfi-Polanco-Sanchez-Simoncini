package models

type User struct {
	ID       string `json:"Id"` //Clave foranea del usuario que va a la tabla pasarela
	Name     string `json:"name"`
	LastName string `json:"lastName"`
	Password string `json:"password"`
	Mail     string `json:"mail"`
	IsAdmin  bool   `json:"isAdmin"`
}
