// estructura y logica de la actividad
package models

import (
	"gorm.io/gorm"
)

type Actividad struct {
	gorm.Model
	Nombre        string        `json:"nombre"`
	Descripcion   string        `json:"descripcion"`
	Fecha         string        `json:"fecha"`
	Duracion      int           `json:"duracion"`
	Categoria     string        `json:"categoria"`
	Profesor      string        `json:"profesor"`
	CupoMAX       int           `json:"cupo_max"`
	Inscripciones []Inscripcion `gorm:"foreignKey:ActividadID"`
}
