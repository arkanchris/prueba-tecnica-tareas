# Imagen base de Node
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Puerto del servidor de desarrollo Vite
EXPOSE 5173

# Arrancar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
