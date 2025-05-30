// estructura y logica de la actividad
package models

import (
	"gorm.io/gorm"
)

type Actividad struct {
	gorm.Model                  // Incluye ID, CreatedAt, UpdatedAt, DeletedAt
	Nombre        string        `json:"nombre"`
	Descripcion   string        `json:"descripcion"`
	Fecha         string        `json:"fecha"`
	Duracion      int           `json:"duracion"`
	Estado        string        `json:"estado"`
	CupoMAX       int           `json:"cupo_max"`
	CategoriaID   uint          `json:"categoria_id"`
	InstructorID  uint          `json:"instructor_id"`
	Categoria     Categoria     `gorm:"foreignKey:CategoriaID"`
	Instructor    Instructor    `gorm:"foreignKey:InstructorID"`
	Inscripciones []Inscripcion `gorm:"foreignKey:ActividadID"`
}
