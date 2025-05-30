package models

import (
	"gorm.io/gorm"
)

type Categoria struct {
	gorm.Model
	TipoDeporte string      `json:"tipo_deporte"`
	Actividades []Actividad `gorm:"foreignKey:CategoriaID"`
}
