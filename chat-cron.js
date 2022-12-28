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

  function sendMessage() {
  if (input.value.trim()) { // verifica che il valore dell'input non sia vuoto o composto solo da spazi vuoti
    const message = input.value;
    // Chiamare la funzione generateBotMessage qui
    const botMessage = generateBotMessage();
    chat.innerHTML += `<div class="chat-bubble user-bubble"><small class="text-muted" id="usersm">You:</small><span class="mx-2">${message}</span></div>`;
    // Aggiungi il messaggio del bot alla chat
    chat.innerHTML += `<div class="chat-bubble bot-bubble"><span>${botMessage}</span></div>`;
    input.value = ''; // azzera il valore dell'input
  }
}

  
  
