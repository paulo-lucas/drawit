const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3333;

const socketIo = require('socket.io');

const io = socketIo.listen(server);

server.listen(port, () => {
  console.log('Running at port '+port);
});

app.use(express.static(__dirname + "/public"));

let colorHistory = [];
let messageHistory = [];

const colors = [
  '#ff0000',
  '#0000ff',
  '#00ff00',
  '#ff6600',
  '#009999',
  '#9900cc',
  '#ffcc00',
  '#0099ff',
  '#ff0099'
]

let counter = 9;

io.on('connection', (socket) => {
  socket.emit('defineColor', colors[counter%9]);
  counter++;

  colorHistory.forEach(line => {
    socket.emit('draw', line);
  });

  messageHistory.forEach(message => {
    socket.emit('message', message);
  });

  socket.on('draw', (line) => {
    colorHistory.push(line);
    io.emit('draw', line);
  });

  socket.on('message', (message) => {
    messageHistory.push(message);
    io.emit('message', message);
  });

  socket.on('erase', () => {
    io.emit('erase');
    colorHistory = [];
  });
});