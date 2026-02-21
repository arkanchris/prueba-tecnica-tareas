# ArkaSoft Tasks

Aplicación de gestión de tareas personales con autenticación JWT.  
Construida con **Django + DRF + PostgreSQL** en el backend y **React + Vite** en el frontend.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Backend | Python 3.11, Django 6, Django REST Framework |
| Autenticación | JWT (djangorestframework-simplejwt) |
| Base de datos | PostgreSQL 15 |
| Frontend | React 18, Vite, React Router, Axios, React Hook Form |
| Estilos | CSS personalizado con variables |
| Contenedores | Docker + Docker Compose (opcional) |

---

## Estructura del proyecto

```
prueba-tecnica-tareas/
├── backend/          # Django + DRF
│   ├── core/         # Configuración del proyecto
│   ├── tasks/        # App de tareas
│   └── manage.py
├── frontend/         # React + Vite
│   └── src/
│       ├── api/      # Llamadas a la API
│       ├── components/
│       └── pages/
├── docker-compose.yml
└── README.md
```

---

## Opción A — Ejecución local (sin Docker)

### Requisitos previos
- Python 3.11+
- Node.js 18+
- PostgreSQL 15 instalado y corriendo

### 1. Clonar el repositorio

```bash
git clone https://github.com/Arkanchris/prueba-tecnica-tareas.git
cd prueba-tecnica-tareas
```

### 2. Configurar el backend

```bash
cd backend

# Crear y activar entorno virtual
python -m venv venv
.\venv\Scripts\Activate.ps1        # Windows PowerShell
# source venv/bin/activate         # Mac/Linux

# Instalar dependencias
pip install -r requirements.txt

# Crear la base de datos en PostgreSQL
# (abre pgAdmin o psql y crea la base: db_tareas_prueba)

# Aplicar migraciones
python manage.py migrate

# Crear superusuario para el admin de Django (opcional)
python manage.py createsuperuser

# Arrancar el servidor
python manage.py runserver
```

El backend queda disponible en: `http://127.0.0.1:8000`

### 3. Configurar el frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Arrancar el servidor de desarrollo
npm run dev
```

El frontend queda disponible en: `http://localhost:5173`

---

## Opción B — Ejecución con Docker Compose

### Requisitos previos
- Docker Desktop instalado y corriendo

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

Esto levanta automáticamente PostgreSQL, el backend y el frontend.

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000/api/ |
| Django Admin | http://localhost:8000/admin/ |

---

## Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | admin |
| Contraseña | admin123 |

> Puedes crear tu propio usuario en `/register` o usando el Django Admin.

---

## Endpoints de la API

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/auth/register/` | Registro de nuevo usuario | No |
| POST | `/api/auth/login/` | Login, retorna token JWT | No |
| POST | `/api/auth/refresh/` | Refresca el token JWT | No |
| GET | `/api/tasks/` | Lista las tareas del usuario | ✅ Sí |
| POST | `/api/tasks/` | Crea una nueva tarea | ✅ Sí |
| GET | `/api/tasks/{id}/` | Detalle de una tarea | ✅ Sí |
| PUT | `/api/tasks/{id}/` | Actualiza una tarea | ✅ Sí |
| PATCH | `/api/tasks/{id}/` | Actualización parcial | ✅ Sí |
| DELETE | `/api/tasks/{id}/` | Elimina una tarea | ✅ Sí |

---

## Configuración de la base de datos

En `backend/core/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'db_tareas_prueba',
        'USER': 'postgres',
        'PASSWORD': 'admin123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

## Autor

**Arkanchris** — Prueba técnica de conocimiento
