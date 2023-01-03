const chat = document.querySelector('.chat');
let open_ai_response;
var input = document.querySelector('input[type="text"]');
var button = document.querySelector('button[type="submit"]');

button.addEventListener('click', sendMessage);
input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function sendMessage(event) {
  // Aggiungi questa riga per impedire l'invio del modulo
  event.preventDefault();
  if (input.value.trim()) {
    const message = input.value;
    chat.innerHTML += `<div class="chat-bubble user-bubble"><small class="text-muted" id="usersm">You:</small><span class="mx-2">${message}</span></div>`;
    // Show the loading spinner
    document.querySelector('.loading').style.display = 'block';
    input.value = '';
    chat.scrollTop = chat.scrollHeight;
    ai_bot(message);
  }
}
  
let previousResponses = '';

async function ai_bot(prompt_text) {
  var url = "https://api.openai.com/v1/engines/text-davinci-002/completions";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer your_api_key_here");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);

      // Parse the response string and get the text field
      const responseObject = JSON.parse(xhr.responseText);
      const text = responseObject.choices[0].text;

      // Trim the leading \n characters
      trimmed = text.trimStart();

      // Replace all occurrences of \n with <br>
      // Use a <pre> element to preserve the text formatting
      const replaced = `<pre>${encodeHTML(trimmed)}</pre>`;


      // Hide the loading spinner
      document.querySelector('.loading').style.display = 'none';

      // Append the chat bubbles to the UI
      chat.innerHTML += `<div class="chat-bubble bot-bubble"><span>${replaced}</span></div>`;
      chat.scrollTop = chat.scrollHeight;

      // Update the previous responses
      previousResponses += `${message}\\n\\n`;
    }
  };

  // Include previous responses in the prompt
  var data = `{
    "prompt": "${"previous questions: " + previousResponses + "\\n\\nactual question: " + prompt_text + "\\n\\nanswer: "}",
    "temperature": 0.7,
    "max_tokens": 300,
    "top_p": 1,
    "frequency_penalty": 0.75,
    "presence_penalty": 0
  }`;

  xhr.send(data);
}

  