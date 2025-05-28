// estructura y logica del usuario
package models

import (
	"gorm.io/gorm"
)

type Usuario struct {
	gorm.Model
	Nombre        string        `json:"nombre"`
	Apellido      string        `json:"apellido"`
	DNI           uint          `json:"dni"`
	Email         string        `json:"email"`
	Contrasenia   string        `json:"contrasenia"` // No enviar hash al frontend
	Rol           string        `json:"rol"`         // admin o socio
	Inscripciones []inscripcion `gorm:"foreignKey:UsuarioID"`
}
