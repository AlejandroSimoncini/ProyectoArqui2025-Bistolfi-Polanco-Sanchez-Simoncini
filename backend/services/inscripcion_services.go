//logica del negocio: se toman decisiones, se hacen validaciones y se conecta el backend con la base de datos.

package services

import (
	"errors"
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
	"time"
)

func InscribirUsuario(usuarioID uint, actividadID uint) error {
	var inscripcion models.Inscripcion

	// Verificar si ya está inscrito
	err := config.DB.Where("usuario_id = ? AND actividad_id = ?", usuarioID, actividadID).First(&inscripcion).Error
	if err == nil {
		return errors.New("usuario ya inscrito en esta actividad")
	}

	// Verificar si la actividad existe y hay cupo
	var actividad models.Actividad
	if err := config.DB.First(&actividad, actividadID).Error; err != nil {
		return errors.New("actividad no encontrada")
	}

	if actividad.Estado != "activa" {
		return errors.New("no se puede inscribir: la actividad no está activa")
	}

	//cuenta cuantos inscritos hay y compara con el cupo maximo
	var totalInscritos int64
	config.DB.Model(&models.Inscripcion{}).Where("actividad_id = ?", actividadID).Count(&totalInscritos)
	if totalInscritos >= int64(actividad.CupoMAX) {
		return errors.New("no hay cupo disponible para esta actividad")
	}

	//si hay lugar
	nueva := models.Inscripcion{
		UsuarioID:   usuarioID,
		ActividadID: actividadID,
		Fecha:       time.Now().Format("2006-01-02"),
		Estado:      "confirmada",
	}

	return config.DB.Create(&nueva).Error
}

// sirve para cambiar el estado (pendiente, confirmada, cancelada)
func EditarInscripcion(id uint, nueva models.Inscripcion, usuarioID uint) error {
	var inscripcion models.Inscripcion

	// Buscar la inscripción por id
	if err := config.DB.First(&inscripcion, id).Error; err != nil {
		return errors.New("inscripción no encontrada")
	}

	// Verificar que la inscripción le pertenezca al usuario
	if inscripcion.UsuarioID != usuarioID {
		return errors.New("no tenés permiso para modificar esta inscripción")
	}

	// Solo permitimos editar el estado
	inscripcion.Estado = nueva.Estado

	return config.DB.Save(&inscripcion).Error
}

func EliminarInscripcion(id uint, usuarioID uint) error {
	var inscripcion models.Inscripcion

	// Buscar la inscripción
	if err := config.DB.First(&inscripcion, id).Error; err != nil {
		return errors.New("inscripción no encontrada")
	}

	// Verificar que la inscripción le pertenezca al usuario
	if inscripcion.UsuarioID != usuarioID {
		return errors.New("no tenés permiso para eliminar esta inscripción")
	}

	return config.DB.Delete(&inscripcion).Error
}
