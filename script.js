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

        if (message.toLowerCase() === "show me your work") {
            appendMessage("Sure! Here's are a few examples of my work:", 'bot');
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.classList.add('image-container');
            appendImage("./assets/past-work/VibeNoteLanding.png" , imageContainer);
            appendImage("./assets/past-work/BlunderClubLanding.png" , imageContainer);
            appendImage("./assets/past-work/KryptLanding.png" , imageContainer);
            appendImage("./assets/past-work/CollabNoteLanding.png" ,  imageContainer);
        }
        // send message
    }
}

let currentImageIndex = 0;
const imageSources = [
    "./assets/past-work/VibeNoteLanding.png",
    "./assets/past-work/BlunderClubLanding.png",
    "./assets/past-work/KryptLanding.png",
    "./assets/past-work/CollabNoteLanding.png"
];

function appendImage(src, imageContainer) {
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer.classList.contains('hidden')) {
        messagesContainer.classList.remove('hidden');
    }

    const imageElement = document.createElement('img');
    imageElement.src = src;
    imageElement.className = 'image';
    imageContainer.appendChild(imageElement);

    const imageViewer = document.getElementById('image-viewer');
    const modalContent = document.getElementById('full-image');

    imageElement.addEventListener('click', function () {
        currentImageIndex = imageSources.indexOf(src); 
        modalContent.src = imageElement.src;
        imageViewer.style.display = 'block';
    });

    messagesContainer.appendChild(imageContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function () {
    const imageViewer = document.getElementById('image-viewer');
    imageViewer.style.display = 'none';
});

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const modalContent = document.getElementById('full-image');

prevBtn.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length; 
    modalContent.src = imageSources[currentImageIndex];
});

nextBtn.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length; 
    modalContent.src = imageSources[currentImageIndex];
});



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