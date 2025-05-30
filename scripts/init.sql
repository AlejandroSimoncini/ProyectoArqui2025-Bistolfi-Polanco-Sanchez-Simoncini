-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS gimnasio;
USE gimnasio;

-- Limpiar tablas si existen
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS inscripciones;
DROP TABLE IF EXISTS actividades;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS instructores;
SET FOREIGN_KEY_CHECKS = 1;

-- Crear categorías de ejemplo
INSERT INTO categorias (id, created_at, tipo_deporte) VALUES
(1, NOW(), 'Funcional'),
(2, NOW(), 'Spinning'),
(3, NOW(), 'Yoga'),
(4, NOW(), 'MMA');

-- Crear instructores de ejemplo
INSERT INTO instructores (id, created_at, nombre, apellido, email, contrasenia) VALUES
(1, NOW(), 'Juan', 'Pérez', 'juan@gym.com', '$2a$14$1234567890123456789012'),
(2, NOW(), 'María', 'García', 'maria@gym.com', '$2a$14$1234567890123456789012'),
(3, NOW(), 'Carlos', 'López', 'carlos@gym.com', '$2a$14$1234567890123456789012');

-- Crear actividades de ejemplo
INSERT INTO actividades (id, created_at, nombre, dia_hora, duracion, cupo_max, categoria_id, instructor_id) VALUES
(1, NOW(), 'Funcional Mañana', '2024-03-20 09:00:00', 60, 15, 1, 1),
(2, NOW(), 'Spinning Power', '2024-03-20 11:00:00', 45, 20, 2, 2),
(3, NOW(), 'Yoga Relax', '2024-03-20 17:00:00', 90, 12, 3, 3),
(4, NOW(), 'MMA Básico', '2024-03-21 10:00:00', 60, 10, 4, 1),
(5, NOW(), 'Funcional Tarde', '2024-03-21 18:00:00', 60, 15, 1, 2);

-- Crear usuarios de ejemplo
INSERT INTO usuarios (id, created_at, nombre, apellido, dni, email, contrasenia, es_admin) VALUES
(1, NOW(), 'Admin', 'Sistema', '11111111', 'admin@gym.com', '$2a$14$1234567890123456789012', true),
(2, NOW(), 'Usuario', 'Normal', '22222222', 'usuario@gym.com', '$2a$14$1234567890123456789012', false);

-- Crear algunas inscripciones de ejemplo
INSERT INTO inscripciones (id, created_at, usuario_id, actividad_id, fecha) VALUES
(1, NOW(), 2, 1, NOW()),
(2, NOW(), 2, 3, NOW()); 