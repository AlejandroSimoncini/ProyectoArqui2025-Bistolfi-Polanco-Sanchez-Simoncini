// Este paquete configura la conexión a la base de datos

package config

import (
	"fmt"
	"log"
	"proyectoarquisoft/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB // Variable global que representa la conexion a la base de datos

// InitDB inicializa la conexión a la base de datos MySQL

func InitDB() {
	// data source name: contiene usuario, contraseña, host y nombre de base (datos de conexion a mysql)
	dsn := "root:root@tcp(mysql:3306)/proyectoarquisoft?charset=utf8mb4&parseTime=True&loc=Local"

	//usuario root, host:localhost:3306,contraseña root, bd: proyectoarquisoft.
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{}) // se conecta usando gorm
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}

	// Crear las tablas automáticamente si no existen
	DB.AutoMigrate(&models.Usuario{}, &models.Actividad{}, &models.Inscripcion{})
	fmt.Println("Conexión a la base de datos establecida")
}
