const brush = {
  color: undefined,
  active: false,
  moving: false,
  pos: { x: 0, y: 0 },
  posBefore: { x: null, y: null }
}

const socket = io.connect();

socket.on('defineColor', (color) => {
  const titleSpan = document.querySelector('#title-color');
  const textBox1 = document.querySelector('#username');
  const textBox2 = document.querySelector('#messageTXT');
  const btn1 = document.querySelector('#done-username');
  const btn2 = document.querySelector('#btn-send');
  titleSpan.style.color = color;
  textBox1.style.border = "solid 3px "+color;
  textBox2.style.border = "solid 3px "+color;
  btn1.style.backgroundColor = color;
  btn2.style.backgroundColor = color;
  brush.color = color;
});

const getCode = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0];
}

const user = {
  name: 'AnonymousTracer',
  code: getCode()
}