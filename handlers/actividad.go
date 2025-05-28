//controllers para manejar las actividades

package handlers

import (
	"net/http"
	"proyectoarquisoft/models"
	"proyectoarquisoft/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

// obtener todas las actividades disponibles
func GetActividades(c *gin.Context) {
	actividades, err := services.GetActividades()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al obtener las actividades"})
		return
	}
	c.JSON(http.StatusOK, actividades)
}

// tener actividad especifica por ID
func GetActividad(c *gin.Context) {
	id := c.Param("id")
	actividad, err := services.GetActividad(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"mensaje": "Actividad no encontrada"})
		return
	}
	c.JSON(http.StatusOK, actividad)
}

// agregar una nueva actividad
func CreateActividad(c *gin.Context) {
	var actividad models.Actividad
	if err := c.ShouldBindJSON(&actividad); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "Datos inválidos"})
		return
	}

	if err := services.AddActividad(actividad); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al crear la actividad"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"mensaje": "Actividad creada exitosamente"})
}

// actualizar una actividad existente
func UpdateActividad(c *gin.Context) {
	id := c.Param("id")
	var data models.Actividad
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "Datos inválidos"})
		return
	}
	if err := services.UpdateActividad(id, data); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al actualizar actividad"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"mensaje": "Actividad actualizada"})
}

// eliminar una actividad
func DeleteActividad(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID inválido"})
		return
	}
	if err := services.DeleteActividad(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error al eliminar actividad"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"mensaje": "Actividad eliminada"})
}
