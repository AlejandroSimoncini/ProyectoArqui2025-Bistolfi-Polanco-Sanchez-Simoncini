# Imagen base oficial de Go
FROM golang:1.20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar todo el código del proyecto al contenedor
COPY . .

# Instalar dependencias
RUN go mod tidy

# Compilar el programa
RUN go build -o server .

# Expone el puerto 80 (el que usa tu main.go)
EXPOSE 80

# Comando por defecto al iniciar el contenedor
CMD ["./server"]
