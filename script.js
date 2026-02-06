const socket = io();

const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('sendBtn');
const nameInput = document.getElementById('name');

sendBtn.onclick = () => {
  const name = nameInput.value || 'Anonymous';
  const msg = msgInput.value;
  if (!msg) return;
  socket.emit('chat message', { from: name, msg });
  msgInput.value = '';
};

socket.on('chat message', ({ from, msg }) => {
  const div = document.createElement('div');
  div.textContent = `${from}: ${msg}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight; // يخلي الشات يوصلك لآخر رسالة
});
