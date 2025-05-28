//funciones auxiliares: manejo de contraseña

package utils

import (
	"golang.org/x/crypto/bcrypt"
)

// hashPassword toma una contraseña en texto plano y devuelve su hash.
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// verifica si el hash de la contraseña coincide con la contraseña en texto plano.
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
