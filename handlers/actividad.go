package handlers

import (
	"net/http"
	"proyectoarquisoft/models"
	"proyectoarquisoft/services"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// GetActividades obtiene todas las actividades y permite búsqueda
func GetActividades(c *gin.Context) {
	// Obtener parámetros de búsqueda
	keyword := c.Query("keyword")
	categoria := c.Query("categoria")
	fechaStr := c.Query("fecha") // Formato esperado: "2024-03-20"

	var fecha time.Time
	var err error
	if fechaStr != "" {
		fecha, err = time.Parse("2006-01-02", fechaStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"mensaje": "Formato de fecha inválido. Use YYYY-MM-DD"})
			return
		}
	}

	// Si no hay parámetros de búsqueda, listar todas
	if keyword == "" && categoria == "" && fechaStr == "" {
		actividades, err := services.ListarActividades()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al obtener actividades"})
			return
		}
		c.JSON(http.StatusOK, actividades)
		return
	}

	// Buscar actividades según criterios
	actividades, err := services.BuscarActividades(keyword, categoria, fecha)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al buscar actividades"})
		return
	}

	c.JSON(http.StatusOK, actividades)
}

// GetActividad obtiene una actividad por ID
func GetActividad(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID inválido"})
		return
	}

	actividad, err := services.ObtenerActividad(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"mensaje": "Actividad no encontrada"})
		return
	}

	c.JSON(http.StatusOK, actividad)
}

// GetActividadesPorUsuario obtiene las actividades de un usuario
func GetActividadesPorUsuario(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID de usuario inválido"})
		return
	}

	actividades, err := services.ObtenerActividadesPorUsuario(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al obtener actividades del usuario"})
		return
	}

	c.JSON(http.StatusOK, actividades)
}

// CreateActividad crea una nueva actividad (solo admin)
func CreateActividad(c *gin.Context) {
	var actividad models.Actividad
	if err := c.ShouldBindJSON(&actividad); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "Datos inválidos"})
		return
	}

	if err := services.CrearActividad(&actividad); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al crear actividad"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"mensaje": "Actividad creada exitosamente", "actividad": actividad})
}

// UpdateActividad actualiza una actividad existente (solo admin)
func UpdateActividad(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID inválido"})
		return
	}

	var actividad models.Actividad
	if err := c.ShouldBindJSON(&actividad); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "Datos inválidos"})
		return
	}

	if err := services.ActualizarActividad(uint(id), &actividad); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensaje": "Actividad actualizada exitosamente"})
}

// DeleteActividad elimina una actividad (solo admin)
func DeleteActividad(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID inválido"})
		return
	}

	if err := services.EliminarActividad(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensaje": "Actividad eliminada exitosamente"})
}
