package handlers

import (
	"net/http"
	"proyectoarquisoft/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

// InscribirUsuario maneja la inscripción de un usuario a una actividad
func InscribirUsuario(c *gin.Context) {
	usuarioID, err := strconv.ParseUint(c.Param("usuario_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID de usuario inválido"})
		return
	}

	actividadID, err := strconv.ParseUint(c.Param("actividad_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID de actividad inválido"})
		return
	}

	err = services.InscribirUsuario(uint(usuarioID), uint(actividadID))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"mensaje": "Inscripción realizada exitosamente"})
}
