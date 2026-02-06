const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static('public')); // ربط مجلد public

io.on('connection', (socket) => {
  console.log('User connected');

  // استقبال الرسائل من أي مستخدم
  socket.on('chat message', ({ from, msg }) => {
    // تبعث لكل المستخدمين، بما فيهم اللي أرسل
    io.emit('chat message', { from, msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
