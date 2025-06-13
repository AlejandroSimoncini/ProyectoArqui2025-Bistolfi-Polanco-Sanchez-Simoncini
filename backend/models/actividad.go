// estructura y logica de la actividad
package models

func (Actividad) TableName() string {
	return "actividades"
}

type Actividad struct {
	ID            uint          `gorm:"primaryKey" json:"id"`
	Nombre        string        `json:"nombre"`
	Descripcion   string        `json:"descripcion"`
	Fecha         string        `json:"fecha"`
	Duracion      int           `json:"duracion"`
	Categoria     string        `json:"categoria"`
	Profesor      string        `json:"profesor"`
	CupoMAX       int           `json:"cupo_max"`
	Inscripciones []Inscripcion `gorm:"foreignKey:ActividadID"`
}
