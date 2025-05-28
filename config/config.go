//configuracion de la base de datos

package config

import (
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// DB es la conexión global a la base de datos
var DB *gorm.DB

// InitDB inicializa la conexión a la base de datos MySQL
func InitDB() {
	// DSN sin usuario ni contraseña
	dsn := "root:password@tcp(localhost:3306)/proyectoarquisoft?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}
	fmt.Println("Conexión a la base de datos  establecida")
}
