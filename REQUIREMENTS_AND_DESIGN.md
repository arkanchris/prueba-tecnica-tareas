# REQUIREMENTS AND DESIGN — ArkaSoft Tasks

Documento de diseño y decisiones técnicas para la prueba técnica.

---

## 1. Requerimientos Funcionales

| # | Requerimiento | Estado |
|---|---|---|
| RF-01 | El sistema permite registrar nuevos usuarios con usuario y contraseña | ✅ Implementado |
| RF-02 | El sistema autentica usuarios mediante JWT y retorna un token de acceso | ✅ Implementado |
| RF-03 | Un usuario autenticado puede crear tareas con título, descripción y estado | ✅ Implementado |
| RF-04 | Un usuario autenticado puede listar únicamente sus propias tareas | ✅ Implementado |
| RF-05 | Un usuario autenticado puede obtener el detalle de una tarea por ID | ✅ Implementado |
| RF-06 | Un usuario autenticado puede actualizar cualquier campo de una tarea propia | ✅ Implementado |
| RF-07 | Un usuario autenticado puede marcar una tarea como completada o pendiente | ✅ Implementado |
| RF-08 | Un usuario autenticado puede eliminar una tarea propia | ✅ Implementado |
| RF-09 | El sistema impide que un usuario acceda, edite o elimine tareas de otros usuarios | ✅ Implementado |

---

## 2. Requerimientos No Funcionales

| # | Requerimiento |
|---|---|
| RNF-01 | El backend expone una API REST documentada con endpoints claros |
| RNF-02 | La autenticación utiliza JWT con tokens de acceso de 1 día de vigencia |
| RNF-03 | Las contraseñas se almacenan hasheadas (usando el sistema de auth de Django) |
| RNF-04 | La API aplica CORS para permitir peticiones desde el frontend en otro origen |
| RNF-05 | El frontend es una SPA (Single Page Application) separada del backend |
| RNF-06 | El proyecto está versionado en Git con commits significativos |
| RNF-07 | La aplicación incluye soporte para Docker (opcional, valorado) |

---

## 3. Supuestos

- Se asume que cada tarea pertenece a un único usuario (no hay tareas compartidas).
- El campo `email` en el registro es opcional, ya que no se requiere verificación.
- El frontend almacena el token JWT en `localStorage` por simplicidad en el contexto de la prueba.
- No se implementa recuperación de contraseña por estar fuera del alcance definido.
- El campo `completed` es booleano simple; no se gestiona historial de cambios de estado.
- Se usa el modelo `User` nativo de Django para no agregar complejidad innecesaria.

---

## 4. Modelo de Datos (ERD)

### Entidades

#### User (nativo de Django)
| Campo | Tipo | Descripción |
|---|---|---|
| id | Integer (PK) | Identificador único |
| username | VARCHAR(150) | Nombre de usuario, único |
| email | VARCHAR(254) | Correo electrónico (opcional) |
| password | VARCHAR | Contraseña hasheada |

#### Task
| Campo | Tipo | Descripción |
|---|---|---|
| id | Integer (PK) | Identificador único |
| user | FK → User | Propietario de la tarea |
| title | VARCHAR(255) | Título de la tarea (requerido) |
| description | TEXT | Descripción detallada (opcional) |
| completed | Boolean | Estado de la tarea (default: false) |
| created_at | DateTime | Fecha y hora de creación (auto) |

### Relación
```
User (1) ──────< Task (N)
```
Un usuario puede tener muchas tareas. Una tarea pertenece a un único usuario.  
Al eliminar un usuario, sus tareas se eliminan en cascada (`on_delete=CASCADE`).

---

## 5. Endpoints Implementados

### Autenticación (públicos)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register/` | Registra un nuevo usuario. Body: `{username, password, email?}` |
| POST | `/api/auth/login/` | Autentica y retorna `{access, refresh}` tokens JWT |
| POST | `/api/auth/refresh/` | Renueva el access token usando el refresh token |

### Tareas (requieren `Authorization: Bearer <token>`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/tasks/` | Lista todas las tareas del usuario autenticado |
| POST | `/api/tasks/` | Crea una nueva tarea. Body: `{title, description?, completed?}` |
| GET | `/api/tasks/{id}/` | Retorna el detalle de una tarea por ID |
| PUT | `/api/tasks/{id}/` | Actualiza todos los campos de una tarea |
| PATCH | `/api/tasks/{id}/` | Actualización parcial de una tarea |
| DELETE | `/api/tasks/{id}/` | Elimina una tarea. Solo el propietario puede ejecutarlo |

---

## 6. Decisiones Técnicas

**¿Por qué JWT y no sesiones?**  
JWT es stateless y es el estándar para APIs REST consumidas por SPAs. Permite que el frontend y backend estén completamente desacoplados sin compartir sesión.

**¿Por qué el modelo User nativo de Django?**  
Django incluye un sistema de autenticación robusto y probado. Extenderlo con un modelo personalizado añadiría complejidad sin beneficio real para este caso de uso.

**¿Por qué `permission_classes = [IsAuthenticated]` en el ViewSet?**  
Garantiza que ningún endpoint de tareas sea accesible sin token, y que `get_queryset` filtre automáticamente solo las tareas del usuario que hace la petición, implementando el aislamiento de datos requerido.

**¿Por qué `CORS_ALLOW_ALL_ORIGINS = True`?**  
Para el entorno de desarrollo local. En producción se restringiría al dominio del frontend.

**¿Por qué React + Vite y no Vue 3?**  
La prueba indica "Vue 3 o Frontend en JS/HTML". Se eligió React por familiaridad con el ecosistema, cumpliendo igualmente el requisito de frontend independiente que consume la API.

---

## 7. Arquitectura General

```
[Browser]
    │
    ├─ React SPA (puerto 5173)
    │      │  HTTP + Bearer Token
    │      ▼
    ├─ Django REST API (puerto 8000)
    │      │  ORM
    │      ▼
    └─ PostgreSQL (puerto 5432)
```
