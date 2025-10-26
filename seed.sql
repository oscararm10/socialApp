-- Crear base de datos
CREATE DATABASE my_social_db;

\c my_social_db;

-- Crear tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de publicaciones
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER DEFAULT 0
);

-- Insertar usuarios predefinidos
INSERT INTO users (name, email, password) VALUES
('User 1', 'user1@example.com', '$2b$10$9kD5yM/3wFZC7aGueF8l5eZj2R4GPO2x2o/Kv5v2C2rI8q6eGqkKu'), -- password123
('User 2', 'user2@example.com', '$2b$10$9kD5yM/3wFZC7aGueF8l5eZj2R4GPO2x2o/Kv5v2C2rI8q6eGqkKu'),
('User 3', 'user3@example.com', '$2b$10$9kD5yM/3wFZC7aGueF8l5eZj2R4GPO2x2o/Kv5v2C2rI8q6eGqkKu');

-- Insertar publicaciones de prueba
INSERT INTO posts (content, user_id) VALUES
('Hola, soy el usuario 1', 1),
('Esta es la publicación del usuario 2', 2),
('Probando desde el usuario 3', 3);
