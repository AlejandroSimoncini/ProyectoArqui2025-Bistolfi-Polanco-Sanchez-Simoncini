package main

import (
    "encoding/json"  // Para manejar JSON (Marshal y Unmarshal).
    "fmt"            // Para imprimir mensajes en consola (debug).
    "io/ioutil"      // Para leer y escribir archivos JSON.
    "net/http"       // Para manejar las solicitudes HTTP (GET, POST, PUT, DELETE).
    "os"             // Para manejar archivos (crear, abrir, eliminar).
    "log"            // Para manejar errores de forma clara.
    "github.com/gorilla/mux" // Router avanzado para manejar rutas (recomendado).

	
)

func main() {
	fmt.Printf("Hola Mundo!")
}
