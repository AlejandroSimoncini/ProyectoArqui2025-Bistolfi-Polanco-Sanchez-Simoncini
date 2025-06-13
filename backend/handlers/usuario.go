//controladores HTTP que reciben las peticiones del cliente, llaman a los servicios correspondientes y devuelven respuestas. Es el punto de entrada del backend a cada funcionalidad.

package handlers

import (
	"net/http"
	"proyectoarquisoft/services"

	"github.com/gin-gonic/gin"
)

// funcion para tener la actividad por usuario
func GetActividadesPorUsuario(c *gin.Context) {
	id := c.Param("id")
	actividad, err := services.GetActividadPorID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al obtener las actividades del usuario"})
		return
	}
	c.JSON(http.StatusOK, actividad)
}
