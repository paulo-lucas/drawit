document.addEventListener('DOMContentLoaded', () => {

  socket.on('message', (message) => {
    appendMessage(message);
  });


  const messagesContainer = document.querySelector("#messages-container");
  const btn = document.querySelector("#btn-send");

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const text = document.querySelector("#messageTXT");
    if(!text.value)
      return
    socket.emit('message', {
      messageContent: text.value,
      color: brush.color,
      usr: user
    });
    text.value = "";
  });

  //função principal de exibição
  const appendMessage = (message) => {
    const messages = document.querySelector("#messages");
    const { messageContent, color, usr } = message;
    const div = document.createElement("div");
    const span = document.createElement("span");
    const p = document.createElement('p');
    const messageType = (user.code === usr.code) ? 'local-message' : 'outside-message';
    span.classList.add('name');
    span.innerText = usr.name;
    p.classList.add('content');
    p.innerText = messageContent;
    div.classList.add("message");
    div.classList.add(messageType);
    div.append(span);
    div.append(p);
    div.style.backgroundColor = color;
    messages.appendChild(div);

    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
  }
});