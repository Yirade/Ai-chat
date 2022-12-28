const chat = document.querySelector('.chat');

var input = document.querySelector('input[type="text"]');
var button = document.querySelector('button[type="submit"]');

button.addEventListener('click', sendMessage);
input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});
  
function removeLoader() {
    var element = document.getElementById("loader");
    element.classList.remove("dot-pulse");
  }
  let open_ai_response;
  
  async function openai(prompt_text) {
    
    var prompt_text = "YOUR TEXT HERE."
    var prompt_text2 = "MORE TEXT HERE."
    
    var url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
  
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer your_api_key_here");
  
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          open_ai_response = xhr.responseText;
          console.log(open_ai_response);
       }};
  
    var data = `{
      "prompt": "${prompt_text}",
      "temperature": 0.7,
      "max_tokens": 256,
      "top_p": 1,
      "frequency_penalty": 0.75,
      "presence_penalty": 0
    }`;
  
    xhr.send(data);
  }

function generateBotMessage() {
    setTimeout(removeLoader, 5000);
    openai(input.value);
    chat.scrollTop = chat.scrollHeight;
    return open_ai_response;
  }

  function sendMessage() {
  if (input.value.trim()) {
    const message = input.value;
    const botMessage = generateBotMessage();
    chat.innerHTML += `<div class="chat-bubble user-bubble"><small class="text-muted" id="usersm">You:</small><span class="mx-2">${message}</span></div>`;
    chat.scrollTop = chat.scrollHeight;
    chat.innerHTML += `<div class="chat-bubble bot-bubble"><div class="dot-pulse mx-4" id="loader"></div><span>${botMessage}</span></div>`;
    chat.scrollTop = chat.scrollHeight;
    input.value = '';
  }
}

  
  
