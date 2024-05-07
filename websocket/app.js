const express = require('express');
const { createServer } = require('http'); // Import from 'http' instead of 'node:http'
const { join } = require('path'); // Use 'path' instead of 'node:path'
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
//     methods: ["GET", "POST"]
//   }
// });

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection' , (socket) => {
    const { userName } = socket.request
    console.log(`${userName} connected`);

  socket.on('joinRoom', (roomId,userId) => {
    socket.join(roomId);
    console.log(`${userId} joined room: ${roomId}`);
  });

  socket.on('chat message', (data) => {
    const { roomId, sender, message, sentTime, sender_name } = data;
    console.log(`[${roomId}] UserId_${sender}: ${message}`);
    io.to(roomId).emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 8000;

// host it locally for public git repository
// server.listen(port, () => {
//   console.log(`server running at xxx`);
// });

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
  });