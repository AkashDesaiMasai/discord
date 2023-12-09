const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server);

const onlineUsers = new Set();

io.on('connection', (socket) => {
  console.log('A user connected');
  // Add user to onlineUsers set when connected
  onlineUsers.add(socket.id);
console.log(onlineUsers)
  // Notify all clients about the updated online users
  io.emit('updateOnlineUsers', Array.from(onlineUsers));

  socket.on('disconnect', () => {
    console.log('User disconnected');

    // Remove user from onlineUsers set when disconnected
    onlineUsers.delete(socket.id);

    // Notify all clients about the updated online users
    io.emit('updateOnlineUsers', Array.from(onlineUsers));
  });
});

server.listen(3001, () => {
  console.log('Socket.IO server listening on port 3001');
});
