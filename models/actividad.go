// estructura y logica de la actividad
package models

import (
	"gorm.io/gorm"
)

type Actividad struct {
	gorm.Model                  // Incluye ID, CreatedAt, UpdatedAt, DeletedAt
	Nombre        string        `json:"nombre"`
	Descripcion   string        `json:"descripcion"`
	Fecha         string        `json:"fecha"` //dia en que se dicta
	Duracion      int           `json:"duracion"`
	Categoria     string        `json:"categoria"`
	Estado        string        `json:"estado"` //activa, cancelada , finalizada  ??
	Instructor    string        `json:"instructor"`
	CupoMAX       int           `json:"cupo_max"`               //cantidad maxima de inscriptos
	Inscripciones []Inscripcion `gorm:"foreignKey:ActividadID"` //Relación 1:N → una actividad tiene muchas inscripciones. Se vincula con la clave foránea ActividadID en Inscripcion.
}
