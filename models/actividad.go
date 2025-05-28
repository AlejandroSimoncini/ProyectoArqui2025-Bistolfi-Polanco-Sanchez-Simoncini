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
	Inscripciones []inscripcion `gorm:"foreignKey:ActividadID"` //Define que una actividad tiene muchas inscripciones asociadas. gorm:Le dice a GORM que debe buscar en la tabla de inscripciones un campo llamado ActividadID, que actúa como clave foránea para relacionar inscripciones con actividades.
}
