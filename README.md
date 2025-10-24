# 🏆 Álbum Panini Digital - API Backend

Una API RESTful para el álbum Panini digital del Mundial 2026, construida con NestJS y SQLite.


## 🚀 Características

- **Gestión de Equipos**: Listar equipos, ver detalles, filtrar por confederación
- **Gestión de Jugadores**: Listar jugadores, ver detalles, filtrar por equipo
- **Estadísticas de Jugadores**: Dribbling, velocidad, regate, shooting, etc.
- **Base de Datos**: SQLite con TypeORM
- **API RESTful**: Endpoints bien estructurados


## 🛠️ Tecnologías

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)


## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JorgeIAJ/panini-album-backend.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev


📋 API Endpoints

Equipos
Método	Endpoint	Descripción
GET	/teams	Todos los equipos
GET	/teams/:id	Equipo específico
GET	/teams/confederation/:id	Equipos por confederación
POST	/teams/seed	Crear datos de ejemplo
Jugadores
Método	Endpoint	Descripción
GET	/players	Todos los jugadores
GET	/players/:id	Jugador específico
GET	/players/team/:teamId	Jugadores por equipo
POST	/players/seed	Crear datos de ejemplo


🗃️ Estructura del Proyecto

src/
├── teams/
│   ├── entities/
│   │   ├── team.entity.ts
│   │   └── confederation.entity.ts
│   ├── teams.controller.ts
│   ├── teams.service.ts
│   └── teams.module.ts
├── players/
│   ├── entities/
│   │   └── player.entity.ts
│   ├── players.controller.ts
│   ├── players.service.ts
│   └── players.module.ts
├── app.module.ts
└── main.ts


👨‍💻 Desarrollo

# Modo desarrollo
npm run start:dev

# Compilar
npm run build

# Producción
npm run start:prod


🌟 Ejemplo de Uso

# Crear datos de ejemplo
curl -X POST http://localhost:3000/teams/seed
curl -X POST http://localhost:3000/players/seed

# Listar equipos
curl http://localhost:3000/teams

# Ver jugadores de Argentina
curl http://localhost:3000/players/team/1



