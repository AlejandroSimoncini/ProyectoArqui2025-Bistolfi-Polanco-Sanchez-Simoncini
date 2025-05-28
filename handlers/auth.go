// controllers para manejar la autenticación de usuarios
package handlers

import (
	"net/http"
	"proyectoarquisoft/models"
	"proyectoarquisoft/services"
	"proyectoarquisoft/utils"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte("clave") // Clave secreta para firmar el JWT

// Registro de usuario
func Register(c *gin.Context) {
	var user models.Usuario
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "Datos inválidos"})
		return
	}

	// Hash de la contraseña
	hashedPassword, err := utils.HashPassword(user.Contrasenia)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "No se pudo hashear la contraseña"})
		return
	}

	user.Contrasenia = hashedPassword // Reemplaza la contraseña en el modelo con la versión hasheada

	if err := services.CrearUsuario(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "Error al registrar el usuario"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"mensajee": "Usuario registrado exitosamente"})
}

// Login de usuario
func Login(c *gin.Context) {
	var datos struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"mensaje": "Datos inválidos"})
		return
	}

	user, err := services.ObtenerUsuarioPorEmail(datos.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Usuario o contraseña inválidos"})
		return
	}

	if !utils.CheckPasswordHash(datos.Password, user.Contrasenia) {
		c.JSON(http.StatusUnauthorized, gin.H{"mensaje": "Usuario o contraseña inválidos"})
		return
	}

	// Crea el JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Email,
		"rol":      user.Rol,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	})
	tokenString, err := token.SignedString(jwtKey) // Firma el token con la clave secreta
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "No se pudo generar el token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
