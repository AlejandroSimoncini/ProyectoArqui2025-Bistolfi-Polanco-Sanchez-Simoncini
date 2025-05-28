//controller para manejar las inscripciones de usuarios a actividades

package handlers

import (
	"net/http"
	"proyectoarquisoft/services"

	"github.com/gin-gonic/gin"
)

// inscripcion de un usuario a una actividad
func InscribirUsuario(c *gin.Context) {
	usuarioID := c.Param("usuario_id")
	actividadID := c.Param("actividad_id")

	err := services.InscribirUsuario(usuarioID, actividadID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error al inscribir al usuario"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"mensaje": "Usuario inscrito exitosamente"})
}
