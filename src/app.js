const express = require('express');

const app = express();

const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3333;

const socketIo = require('socket.io');
const messageSocket = require('./sockets/message');
const drawSocket = require('./sockets/draw');

const io = socketIo.listen(server);

server.listen(port, () => {
  console.log('Running at port '+port);
});

app.use(express.static(__dirname + "/../public"));


drawSocket(io);
messageSocket(io);
