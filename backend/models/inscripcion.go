// estructura y logica de la inscripcion
package models

func (Inscripcion) TableName() string {
	return "inscripciones"
}

type Inscripcion struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	UsuarioID   uint   `json:"usuario_id"`
	ActividadID uint   `json:"actividad_id"`
	Fecha       string `json:"fecha"`
}
