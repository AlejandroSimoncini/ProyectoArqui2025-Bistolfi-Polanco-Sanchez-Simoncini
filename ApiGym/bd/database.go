package bd

import (
	"ApiGym/config"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DBUsers *gorm.DB
var DBActivity *gorm.DB

func ConectDatabase() {
	var err error

	DBUsers, err = gorm.Open(sqlite.Open(config.DefaultUserFile), &gorm.Config{})
	if err != nil {
		log.Fatal("No se pudo conectar con la base de datos de usuarios:", err)
	}
}
