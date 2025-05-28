//controllers para manejar los usuarios

package handlers

import (
	"net/http"
	"proyectoarquisoft/services"

	"github.com/gin-gonic/gin"
)

// funcion para tener la actividad por usuario
func GetActividadesPorUsuario(c *gin.Context) {
	id := c.Param("id")
	actividades, err := services.GetActividadesPorUsuario(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al obtener las actividades del usuario"})
		return
	}
	c.JSON(http.StatusOK, actividades)
}
