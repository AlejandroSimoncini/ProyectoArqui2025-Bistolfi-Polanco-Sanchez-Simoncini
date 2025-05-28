// estructura y logica de la inscripcion
package models

import (
	"gorm.io/gorm"
)

type inscripcion struct {
	gorm.Model
	UsuarioID   int    `json:"usuario_id"`
	ActividadID int    `json:"actividad_id"`
	Fecha       string `json:"fecha"`
	Estado      string `json:"estado"` // Puede ser "pendiente", "confirmada", "cancelada"
}
