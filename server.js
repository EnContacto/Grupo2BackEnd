const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Cola en memoria (array)
let messageQueue = [];

// Función para procesar mensajes de la cola
function processQueue() {
  if (messageQueue.length > 0) {
    // Simula el procesamiento del mensaje
    const message = messageQueue.shift(); // Obtiene el primer mensaje de la cola
    console.log('Procesando mensaje:', message);
    io.emit('new_message', message); // Envía el mensaje a todos los clientes

    // Aquí podrías agregar lógica de procesamiento, por ejemplo, persistencia en base de datos, etc.
  }
}

// Configurar WebSocket para chat en tiempo real
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar mensajes entrantes desde el frontend
  socket.on('send_message', (message) => {
    console.log('Mensaje recibido: ', message);

    // Colocar el mensaje en la cola en memoria
    messageQueue.push(message);
    console.log('Mensaje colocado en la cola. Cola actual:', messageQueue);

    // Llamar a la función que procesa la cola
    processQueue();
  });

  // Gestionar desconexión de usuario
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Configurar el servidor Express
app.get('/', (req, res) => {
  res.send('Servidor Backend de Chat');
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log('Servidor de chat en puerto 3000');
});
