//logica del negocio

package services

import (
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
)

func CrearUsuario(user *models.Usuario) error {
	return config.DB.Create(user).Error
}

func ObtenerUsuarioPorEmail(email string) (*models.Usuario, error) {
	var user models.Usuario
	if err := config.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
