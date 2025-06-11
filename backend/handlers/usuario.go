//controladores HTTP que reciben las peticiones del cliente, llaman a los servicios correspondientes y devuelven respuestas. Es el punto de entrada del backend a cada funcionalidad.

package handlers

import (
	"net/http"
	"proyectoarquisoft/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

// obtener las actividades de un usuario, se usa en el perfil del usuario para mostrar sus actividades
func GetActividadesPorUsuario(c *gin.Context) {
	idStr := c.Param("id")
	userID, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID inválido"})
		return
	}

	actividades, err := services.GetActividadesPorUsuarioID(uint(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al obtener las actividades del usuario"})
		return
	}
	c.JSON(http.StatusOK, actividades)
}
