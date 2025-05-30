package models

import (
	"gorm.io/gorm"
)

type Instructor struct {
	gorm.Model
	Nombre      string      `json:"nombre"`
	Apellido    string      `json:"apellido"`
	Email       string      `json:"email" gorm:"unique"`
	Contrasenia string      `json:"contrasenia,omitempty"` // omitempty para no enviar al frontend
	Actividades []Actividad `gorm:"foreignKey:InstructorID"`
}
