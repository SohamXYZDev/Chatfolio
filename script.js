var isHidden = true;

function sendQuick(message) {
    const input = document.getElementById('userInput');
    input.value = message;
    sendMessage(); 
}

document.getElementById('userInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (message) {
        appendMessage(message, 'user'); 
        input.value = ''; 

        setTimeout(() => {
            appendMessage("I'm just a bot, but I'm here to help!", 'bot');
        }, 1000);
    }
}

function appendMessage(content, sender) {
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer.classList.contains('hidden')) {
        messagesContainer.classList.remove('hidden');
    }
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = content;
    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}