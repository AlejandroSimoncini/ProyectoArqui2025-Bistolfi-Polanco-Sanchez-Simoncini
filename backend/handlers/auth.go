//controladores HTTP que reciben las peticiones del cliente, llaman a los servicios correspondientes y devuelven respuestas. Es el punto de entrada del backend a cada funcionalidad.

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

// Registro de usuario  (recibe un json con los datos del usuario, hashea la contraseña, llama a crearusuario para guardar en la bd )
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

	c.JSON(http.StatusCreated, gin.H{"mensaje": "Usuario registrado exitosamente"})
}

// Login de usuario (recibe datos, busca al usuario en BD, verifica la contra hasheada y si es correccto genera un JWT )
func Login(c *gin.Context) {
	var datos struct {
		Email    string `json:"email"`
		Password string `json:"contrasenia"`
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

	// Crea el JWT (token de autorizacion permite que mantenga su sesion sin guardar datos en el servidor)
	// El token contiene el ID del usuario, su email y rol, y una fecha de expiración
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"usuarioID": user.ID,
		"username":  user.Email,
		"rol":       user.Rol,
		"exp":       time.Now().Add(time.Hour * 01).Unix(),
	})
	tokenString, err := token.SignedString(jwtKey) // Firma el token con la clave secreta
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"mensaje": "No se pudo generar el token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
