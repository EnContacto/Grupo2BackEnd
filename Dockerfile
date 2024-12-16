# Usar una imagen base de Node.js
FROM node:16

# Crear un directorio para la aplicación
WORKDIR /app

# Copiar los archivos de la aplicación
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto que usará la aplicación
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
