// autenticacion y autorizacion de usuarios
package middlewares

import (
	"net/http" // para las respuestas HTTP
	"strings"  // para manipular cadenas de texto

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt" //libreria para manejar JWT
)

var jwtKey = []byte("clave") // Clave para verificar los tokens (no se comparte), obtener por byte

// middleware para autenticar usuarios , verifica si el token JWT es válido
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		tokenString := c.GetHeader("Authorization") // Obtener el token del encabezado(header) "Authorization"

		//si no hay token, devolver un error
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token no proporcionado"})
			c.Abort()
			return
		}

		tokenStr := strings.TrimPrefix(tokenString, "Token ") //quitar el prefijo "Token " para obtener solo el token
		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil // Verificar la firma del token usando la clave
		})

		// manejar error de parseo del token
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token inválido"})
			c.Abort()
			return
		}

		//si el token es válido, se extrae los datos (claims) del token
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			//se puede acceder a los datos del usuario desde el token
			c.Set("usuarioID", claims["usuarioID"]) // Guardar el ID del usuario
			c.Set("rol", claims["rol"])             // Guardar el rol del usuario
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token inválido"})
			c.Abort()
			return
		}

	}
}

// permitir solo usuarios con rol "admin"
func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		rol, exists := c.Get("rol") // Obtener el rol del contexto
		if !exists || rol != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Acceso denegado"})
			c.Abort()
			return
		}

		c.Next() // Si es admin, continúa a la siguiente función
	}
}
