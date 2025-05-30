package main

import (
	"log"
	"proyectoarquisoft/config"
	"proyectoarquisoft/handlers"
	"proyectoarquisoft/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	// Inicializar la base de datos
	config.InitDB()

	// Crear el router
	r := gin.Default()

	// Rutas de autenticación
	r.POST("/api/auth/login", handlers.Login)
	r.POST("/api/auth/register", handlers.Register)

	// Rutas públicas para actividades
	r.GET("/api/act/:id", handlers.GetActividad)
	r.GET("/api/actividades", handlers.GetActividades)
	r.GET("/api/user/:id/activities", handlers.GetActividadesPorUsuario)
	r.POST("/api/user/:usuario_id/:actividad_id", handlers.InscribirUsuario)

	// Rutas protegidas para administradores
	admin := r.Group("/api")
	admin.Use(middlewares.AuthMiddleware(), middlewares.AdminMiddleware())
	{
		admin.POST("/activity", handlers.CreateActividad)
		admin.PUT("/activity/:id", handlers.UpdateActividad)
		admin.DELETE("/activity/:id", handlers.DeleteActividad)
	}

	// Iniciar el servidor
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}
