const cron = require('node-cron');

let messageHistory = [];

const createSockets = (io) => {
  io.on('connection', (socket) => {

    messageHistory.forEach(message => {
      socket.emit('message', message);
    });

    socket.on('message', (message) => {
      messageHistory.push(message);
      io.emit('message', message);
    });
  });

  cron.schedule("*/10 * * * *", () => {
    const message = {
      messageContent: "All messages will be automatically removed every 10 minutes.",
      color: "grey",
      usr: {
        name: "System",
        code: 1
      }
    }

    messageHistory = [message];

    io.emit('delete');

    io.emit('message', message);
  });
}

module.exports = (io) => {
  createSockets(io);
}