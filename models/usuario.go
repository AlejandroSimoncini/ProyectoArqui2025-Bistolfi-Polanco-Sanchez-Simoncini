// estructura y logica del usuario
package models

import (
	"gorm.io/gorm"
)

type Usuario struct {
	gorm.Model
	Nombre        string        `json:"nombre"`
	Apellido      string        `json:"apellido"`
	DNI           string        `json:"dni" gorm:"unique"`
	Email         string        `json:"email" gorm:"unique"`
	Contrasenia   string        `json:"contrasenia,omitempty"` // omitempty para no enviar al frontend
	EsAdmin       bool          `json:"es_admin"`
	Inscripciones []Inscripcion `gorm:"foreignKey:UsuarioID"`
}
