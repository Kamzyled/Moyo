const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve React build
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Store active rooms
const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('create-room', ({ roomCode }) => {
    socket.join(roomCode);
    rooms[roomCode] = rooms[roomCode] || {};
    rooms[roomCode].player1 = socket.id;
    socket.emit('room-created', { roomCode });
  });

  socket.on('join-room', ({ roomCode }) => {
    if (rooms[roomCode] && !rooms[roomCode].player2) {
      socket.join(roomCode);
      rooms[roomCode].player2 = socket.id;
      io.to(roomCode).emit('room-ready', { roomCode });
    } else {
      socket.emit('error', { message: 'Room full or does not exist.' });
    }
  });

  socket.on('player1-answer', ({ roomCode, question, answer }) => {
    io.to(roomCode).emit('new-question', { question, answer });
  });

  socket.on('player2-guess', ({ roomCode, guess }) => {
    const correctAnswer = rooms[roomCode]?.answer;
    const isCorrect = guess === correctAnswer;
    io.to(roomCode).emit('guess-result', { guess, isCorrect });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove player from room
    for (let roomCode in rooms) {
      if (rooms[roomCode].player1 === socket.id) delete rooms[roomCode].player1;
      if (rooms[roomCode].player2 === socket.id) delete rooms[roomCode].player2;
      if (!rooms[roomCode].player1 && !rooms[roomCode].player2) delete rooms[roomCode];
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
