const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Отдаем файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    // Когда кто-то присылает сообщение, пересылаем его всем
    socket.on('message', (data) => {
        io.emit('message', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Чат работает на порту ${PORT}`);
});
