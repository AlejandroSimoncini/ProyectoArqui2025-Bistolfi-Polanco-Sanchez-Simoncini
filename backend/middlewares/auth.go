// autenticacion y autorizacion de usuarios
package middlewares

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte("clave")

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		tokenString := c.GetHeader("Authorization")

		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token no proporcionado"})
			c.Abort()
			return
		}

		tokenStr := strings.TrimPrefix(tokenString, "Token ")

		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token inválido"})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token inválido"})
			c.Abort()
			return
		}

		// 🔥 VALIDACIÓN DE EXPIRACIÓN (LA PARTE QUE FALTABA)
		if exp, ok := claims["exp"].(float64); ok {
			if time.Now().Unix() > int64(exp) {
				c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Token expirado"})
				c.Abort()
				return
			}
		}

		c.Set("usuarioID", claims["usuarioID"])
		c.Set("rol", claims["rol"])
	}
}

// permitir solo usuarios con rol "admin"
func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		rol, exists := c.Get("rol")
		if !exists || rol != "admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Acceso denegado"})
			c.Abort()
			return
		}
		c.Next()
	}
}
