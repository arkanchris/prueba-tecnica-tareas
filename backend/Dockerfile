# Imagen base de Python
FROM python:3.11-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar e instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Puerto que expone el backend
EXPOSE 8000

# Comando para arrancar Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
