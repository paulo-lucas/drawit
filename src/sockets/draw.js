const colors = [
  '#ff0000',
  '#3366ff',
  '#33ff33',
  '#ff6600',
  '#009999',
  '#9900cc',
  '#ffcc00',
  '#0099ff',
  '#ff0099'
]

let counter = 9;
let colorHistory = [];

const createSockets = (io) => {
  io.on('connection', (socket) => {
    socket.emit('defineColor', colors[counter % 9]);
    counter++;

    colorHistory.forEach(line => {
      socket.emit('draw', line);
    });

    socket.on('draw', (line) => {
      colorHistory.push(line);
      io.emit('draw', line);
    });

    socket.on('erase', () => {
      io.emit('erase');
      colorHistory = [];
    });
  });
}

module.exports = (io) => {
  createSockets(io);
}