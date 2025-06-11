// estructura y logica de la inscripcion
package models

import (
	"gorm.io/gorm"
)

//Una relación entre un usuario y una actividad. Es decir, el registro que indica que un socio se inscribió a una actividad.

type Inscripcion struct {
	gorm.Model
	UsuarioID   uint   `json:"usuario_id"`   //fk que apunta al usuario que se inscribe
	ActividadID uint   `json:"actividad_id"` //fk que apunta a la actividad seleccionada
	Fecha       string `json:"fecha"`
}
