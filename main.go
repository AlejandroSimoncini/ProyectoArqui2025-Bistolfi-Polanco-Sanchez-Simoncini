// punto de entrada de la aplicación
package main

import (
	"log"
	"proyectoarquisoft/config"
	"proyectoarquisoft/handlers"
	"proyectoarquisoft/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()    // Inicializar la conexión a la base de datos
	r := gin.Default() // Crear una nueva instancia de Gin

	r.POST("/register", handlers.Register) // Ruta para registrar un nuevo usuario
	r.POST("/login", handlers.Login)       // Ruta para iniciar sesión

	//rutas publicas
	r.GET("/actividades", handlers.GetActividades)                            // Obtener todas las actividades
	r.GET("/actividades/:id", handlers.GetActividad)                          // Obtener una actividad específica por ID
	r.GET("/usuarios/:id/actividades", handlers.GetActividadesPorUsuario)     // Obtener actividades de un usuario específico
	r.POST("/inscribir/:usuario_id/:actividad_id", handlers.InscribirUsuario) // Inscribir un usuario a una actividad

	// Rutas protegidas con middleware de autenticación
	admin := r.Group("/admin")
	admin.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware()) // Aplicar middleware de autenticación y autorización

	{
		admin.POST("/actividad", handlers.CreateActividad)       // Crear una nueva actividad
		admin.PUT("/actividad/:id", handlers.UpdateActividad)    // Actualizar una actividad existente
		admin.DELETE("/actividad/:id", handlers.DeleteActividad) // Eliminar una actividad
	}

	// Iniciar el servidor en el puerto 80
	if err := r.Run(":80"); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}
