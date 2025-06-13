// punto de entrada de la aplicación
package main

import (
	"log"
	"proyectoarquisoft/config"
	"proyectoarquisoft/handlers"
	"proyectoarquisoft/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()    // Inicializar la conexión a la base de datos (primero al iniciar programa)
	r := gin.Default() // Crear una nueva instancia del framework web gin
	r.Use(cors.Default())

	//rutas publicas (disponibles sin autenticación)
	// Rutas públicas
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)
	r.GET("/actividades", handlers.GetActividades)
	r.GET("/actividades/:id", handlers.GetActividadPorID)

	// Rutas para administradores
	admin := r.Group("/admin")
	admin.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware())
	{
		admin.POST("/actividad", handlers.CreateActividad)
		admin.PUT("/actividad/:id", handlers.UpdateActividad)
		admin.DELETE("/actividad/:id", handlers.DeleteActividad)
	}

	// Rutas para socios autenticados
	socio := r.Group("/socio")
	socio.Use(middlewares.AuthMiddleware())
	{
		socio.POST("/inscribir/:usuario_id/:actividad_id", handlers.InscribirUsuario)
		socio.GET("/usuarios/:id/actividades", handlers.GetActividadesPorUsuario)
		socio.DELETE("/inscripcion/:id", handlers.EliminarInscripcion)
	}

	// Iniciar el servidor en el puerto 80
	if err := r.Run(":80"); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}
