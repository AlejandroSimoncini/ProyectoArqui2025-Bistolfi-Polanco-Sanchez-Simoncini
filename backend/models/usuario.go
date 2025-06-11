// estructura y logica del usuario
package models

type Usuario struct {
	ID            uint          `gorm:"primaryKey" json:"id"`
	Nombre        string        `json:"nombre"`
	Apellido      string        `json:"apellido"`
	DNI           uint          `json:"dni"`
	Email         string        `json:"email"`
	Contrasenia   string        `json:"contrasenia"` // Hasheada
	Rol           string        `json:"rol"`         // "admin" o "socio"
	Inscripciones []Inscripcion `gorm:"foreignKey:UsuarioID"`
}
