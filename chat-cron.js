const chat = document.querySelector('.chat');

var input = document.querySelector('input[type="text"]');
var button = document.querySelector('button[type="submit"]');

button.addEventListener('click', sendMessage);
input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function generateBotMessage() {
    // Genera il messaggio del bot e restituiscilo
    return 'Messaggio del bot';
  }

  function sendMessage(event) {
    // Aggiungi questa riga per impedire l'invio del modulo
    event.preventDefault();
    if (input.value.trim()) {
      const message = input.value;
      const botMessage = generateBotMessage();
      chat.innerHTML += `<div class="chat-bubble user-bubble"><small class="text-muted" id="usersm">You:</small><span class="mx-2">${message}</span></div>`;
      chat.scrollTop = chat.scrollHeight;
      chat.innerHTML += `<div class="chat-bubble bot-bubble"><span>${botMessage}</span></div>`;
      chat.scrollTop = chat.scrollHeight;
      input.value = '';  // cancella l'input solo dopo aver inviato il messaggio e aggiunto il nuovo elemento alla chat
    }
  }