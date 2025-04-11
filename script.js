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
            setTimeout(() => {
                appendMessage("Sure! Here's a few examples of my work:", 'bot');
            }
            , 1000);
            setTimeout(() => {
                appendMessage("Click on any image to view it in full size.", 'bot');
            }
            , 1500);
            setTimeout(() => {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';
                imageContainer.classList.add('image-container');
                appendImage("./assets/past-work/VibeNoteLanding.png" , imageContainer);
                appendImage("./assets/past-work/BlunderClubLanding.png" , imageContainer);
                appendImage("./assets/past-work/KryptLanding.png" , imageContainer);
                appendImage("./assets/past-work/CollabNoteLanding.png" ,  imageContainer);
            }
            , 2000);
        }
        geminiResponse(message)
    }
}

async function geminiResponse(message) {
    // send message
    try {
        const response = await fetch("http://localhost:3000/generate-tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        console.log(data.responsemessage); 
        return data.responsemessage; 
    } catch (error) {
        console.error("Error: ", error);
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
const imageCounter = document.getElementById('image-counter');
const modalContent = document.getElementById('full-image');

prevBtn.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length; 
    imageCounter.textContent = `${currentImageIndex + 1}` + " of " + `${imageSources.length}`;
    modalContent.src = imageSources[currentImageIndex];
});

nextBtn.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length; 
    imageCounter.textContent = `${currentImageIndex + 1}` + " of " + `${imageSources.length}`;
    modalContent.src = imageSources[currentImageIndex];
});



function appendMessage(content, sender) {
    
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer.classList.contains('hidden')) {
        messagesContainer.classList.remove('hidden');
    }
    
    //fade in animation (in faade-in class)
    

    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = content;
    messagesContainer.appendChild(messageElement);
    if (sender === 'bot') {
        messageElement.classList.add('fade-in');
        setTimeout(() => {
            messageElement.classList.remove('fade-in-longer');
        }, 1000);
    } else {
        messageElement.classList.add('fade-in');
        setTimeout(() => {
            messageElement.classList.remove('fade-in');
        }, 500);
    }


    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
}