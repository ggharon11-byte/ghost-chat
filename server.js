// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static('public')); // ضع HTML/JS هنا

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('chat message', ({from, to, msg}) => {
    // ابعث الرسالة فقط للمستلم المحدد
    io.emit('chat message', {from, to, msg});
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
