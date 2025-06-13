// estructura y logica del usuario
package models

import (
	"gorm.io/gorm"
)

//un usuario puede ser socio(se inscribe a act) o admin (gestiona actividades)

type Usuario struct {
	gorm.Model
	Nombre        string        `json:"nombre"`
	Apellido      string        `json:"apellido"`
	DNI           uint          `json:"dni"`
	Email         string        `json:"email"`
	Contrasenia   string        `json:"contrasenia"`          // contraseña hasheada. nunca se manda al frontend
	Rol           string        `json:"rol"`                  // admin o socio
	Inscripciones []Inscripcion `gorm:"foreignKey:UsuarioID"` //Relación 1:N → un usuario puede estar inscripto en varias actividades.
}
