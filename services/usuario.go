package services

import (
	"errors"
	"proyectoarquisoft/config"
	"proyectoarquisoft/models"
)

// CrearUsuario crea un nuevo usuario en la base de datos
func CrearUsuario(usuario *models.Usuario) error {
	result := config.DB.Create(usuario)
	return result.Error
}

// ObtenerUsuarioPorEmail busca un usuario por su email
func ObtenerUsuarioPorEmail(email string) (*models.Usuario, error) {
	var usuario models.Usuario
	result := config.DB.Where("email = ?", email).First(&usuario)
	if result.Error != nil {
		return nil, errors.New("usuario no encontrado")
	}
	return &usuario, nil
}

// ObtenerUsuarioPorID busca un usuario por su ID
func ObtenerUsuarioPorID(id uint) (*models.Usuario, error) {
	var usuario models.Usuario
	result := config.DB.First(&usuario, id)
	if result.Error != nil {
		return nil, errors.New("usuario no encontrado")
	}
	return &usuario, nil
}
