# socialApp

# Intrucciones de instalación y ejecucion

# 1. Clonar repositorio
git clone [<REPO_URL>](https://github.com/oscararm10/socialApp.git)

cd productosNodejs

# 2. Ejecutar servicio

Ejecutar en los dos servicio el siguiente comando para instalar dependencias

```bash
$ npm install
```
Una vez finalizafo ejecutar el siguiente comando

```bash
$ npm run dev
```

## Esto levantará:

- Frontend en http://localhost:5173/login
- Backend en http://localhost:4000

# 3. Endpoints principales

## Microservicio Productos

- POST /productos → Crear producto

### Endpoints principales:

- GET /auth/login?email=alice@example.com&password=password1 — devuelve { token } (seed crea 3 usuarios: alice, bob, carlos).

- GET /posts — lista publicaciones.

- POST /posts — crear publicación (header Authorization: Bearer <TOKEN>; body { "content": "..." }).

- POST /posts/:id/like — dar like (autenticado).

- GET /users/:id — ver perfil del usuario (sin password).

# Arquitectura

El sistema está compuesto por tres capas principales: 
- **Frontend**: Aplicación React con Vite, responsable de la interfaz y la comunicación con la API. 
- **Backend (API REST)**: Implementado con Node.js + Express + TypeORM, gestiona la autenticación JWT y la lógica de negocio. 
- **Base de datos (PostgreSQL)**: Almacena usuarios, publicaciones y likes.
