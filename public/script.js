
const brush = {
    color: undefined,
    active: false,
    moving: false,
    pos: {x:0, y:0},
    posBefore: {x:null, y:null}
  }
document.addEventListener('DOMContentLoaded', () => {
  

  const socket = io.connect();

  socket.on('defineColor', (color) => {
    brush.color = color;
  });

  socket.on('draw', (line) => {
    drawLine(line);
  });

  socket.on('erase', () => {
    ctx.clearRect(0, 0, screen.width, screen.height);
  });

  
  const screen = document.querySelector('#screen');
  const ctx = screen.getContext('2d');
  const btn = document.querySelector('.btn');
  let cooldown = 0;

  screen.width = 800;
  screen.height = 600;

  ctx.lineWidth = 5;

  const drawLine = (line) => {
    ctx.strokeStyle = line.color;
    ctx.beginPath();
    ctx.moveTo(line.posBefore.x, line.posBefore.y);
    ctx.lineTo(line.pos.x, line.pos.y);
    ctx.stroke();
  }

  screen.onmousedown = (event) => {brush.active = true}
  screen.onmouseup = (event) => {brush.active = false}
  screen.onmousemove = (event) => {
    brush.pos.x = (event.clientX - (window.innerWidth/2 - screen.width/2));
    brush.pos.y = (event.clientY - (window.innerHeight/2 - screen.height/2));
    brush.moving = true;
  }

  const cycle = () => {
    if(brush.active && brush.moving && brush.posBefore){
      socket.emit('draw', {color: brush.color, pos: brush.pos, posBefore: brush.posBefore})
      brush.moving = false;
    }
    brush.posBefore = { x: brush.pos.x, y: brush.pos.y};

    setTimeout(cycle, 10);
  }

  btn.addEventListener('click', (e) => {
    socket.emit('erase');

    const count = document.querySelector('#count');
    btn.disabled = true;
    btn.classList.add('disabled-btn');
    cooldown = 20;
    count.innerText = cooldown;
    let seconds = setInterval(() => {
      cooldown -= 1;
      count.innerText =  cooldown;
      if(!cooldown){
        btn.disabled = false;
        btn.classList.remove('disabled-btn');
        clearInterval(seconds);
      }
    }, 1000);
    
  });

  function decrementSeconds(interval, count) {
    
  }

  cycle();
});