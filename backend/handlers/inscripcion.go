//controladores HTTP que reciben las peticiones del cliente, llaman a los servicios correspondientes y devuelven respuestas. Es el punto de entrada del backend a cada funcionalidad.

package handlers

import (
	"net/http"
	"proyectoarquisoft/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

func InscribirUsuario(c *gin.Context) {
	// Obtener ID del usuario desde el token, verifica que el usuarioid de la URL coincida con el id del token
	tokenUserIDRaw, exists := c.Get("usuarioID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token inválido"})
		return
	}
	tokenUserID := uint(tokenUserIDRaw.(float64)) // JWT devuelve float64

	// Obtener los IDs desde la URL
	usuarioIDStr := c.Param("usuario_id")
	actividadIDStr := c.Param("actividad_id")

	usuarioIDParsed, err := strconv.ParseUint(usuarioIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID de usuario inválido"})
		return
	}
	actividadIDParsed, err := strconv.ParseUint(actividadIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID de actividad inválido"})
		return
	}

	usuarioID := uint(usuarioIDParsed)
	actividadID := uint(actividadIDParsed)

	// Validar que el usuario del token sea el que quiere inscribirse
	if tokenUserID != usuarioID {
		c.JSON(http.StatusForbidden, gin.H{"mensaje": "No podés inscribir a otro usuario"})
		return
	}

	// Llamar al servicio
	err = services.InscribirUsuario(usuarioID, actividadID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensaje": "Usuario inscrito exitosamente"})
}

// maneja la eliminación de una inscripción
func EliminarInscripcion(c *gin.Context) {
	tokenUserIDRaw, exists := c.Get("usuarioID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token inválido"})
		return
	}
	tokenUserID := uint(tokenUserIDRaw.(float64))

	// Obtener ID de la inscripción
	idStr := c.Param("id")
	idParsed, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "ID inválido"})
		return
	}
	inscripcionID := uint(idParsed)

	if err := services.EliminarInscripcion(inscripcionID, tokenUserID); err != nil {
		c.JSON(http.StatusForbidden, gin.H{"mensaje": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mensaje": "Inscripción eliminada exitosamente"})
}
