//logica del negocio: se toman decisiones, se hacen validaciones y se conecta el backend con la base de datos.

package services

import (
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
)

func CrearUsuario(user *models.Usuario) error {
	return config.DB.Create(user).Error //inserta nuevo usuario en la bd, se usa durante el registro
}

// buscar usuario por mail, se usa en el login para verificar la identidad
func ObtenerUsuarioPorEmail(email string) (*models.Usuario, error) {
	var user models.Usuario
	if err := config.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func GetActividadesPorUsuarioID(userID uint) ([]models.Actividad, error) {
	var actividades []models.Actividad
	err := config.DB.
		Joins("JOIN inscripciones ON inscripciones.actividad_id = actividades.id").
		Where("inscripciones.usuario_id = ?", userID).
		Find(&actividades).Error

	return actividades, err
}
