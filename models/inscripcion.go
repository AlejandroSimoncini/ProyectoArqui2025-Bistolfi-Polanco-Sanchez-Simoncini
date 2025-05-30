// estructura y logica de la inscripcion
package models

import (
	"time"

	"gorm.io/gorm"
)

type Inscripcion struct {
	gorm.Model
	UsuarioID   uint      `json:"usuario_id"`
	ActividadID uint      `json:"actividad_id"`
	Fecha       time.Time `json:"fecha"`
	Usuario     Usuario   `gorm:"foreignKey:UsuarioID"`
	Actividad   Actividad `gorm:"foreignKey:ActividadID"`
}
