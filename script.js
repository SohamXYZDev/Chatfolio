const resumePath = "./assets/resume.pdf";
let apiUrl = "https://chatfolio-lt9b.onrender.com";
let fallbackApiUrl = "http://localhost:3000"
var isHidden = true;
// store chatbox history
var chatHistory = "";
const imageCounter = document.getElementById('image-counter');

const calmingMusic = document.getElementById("calmingMusic")
// play music on load
window.addEventListener('load', function() {
    calmingMusic.play();
});

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
        chatHistory += `User: ${message}\n`;
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
        } else {
            response_from_func = geminiResponse(message)
            setTimeout(() => {
                response_from_func.then((response) => {
                    // Match all imageInsert(...) calls and remove them from the response
                    const matches = [...response.matchAll(/attach\((.*?)\)/g)];
                    
                    // Remove imageInsert(...) calls from the response
                    var cleanResponse = response.replace(/attach\((.*?)\)/g, "");
                
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'image-container';
                    if (matches.length > 0) {
                        matches.forEach(match => {
                            const imageUrl = match[1].replace(/['"]/g, "");
                            appendImage(imageUrl, imageContainer);
                        });
                    }
                
                    const resumeContainer = document.createElement('div');
                    resumeContainer.className = 'pdf-container';
                    if (response.includes("resumeDownload")) {
                        appendResume(resumePath, resumeContainer);
                        cleanResponse = cleanResponse.replace("resumeDownload","")
                    }
                    if (response.includes("stopMusic")){
                        calmingMusic.pause();
                        cleanResponse = response.replace("stopMusic","")
                    } else if (response.includes("playMusic")){
                        calmingMusic.play();
                        cleanResponse = cleanResponse.replace("playMusic","")
                    }
                    if (response.includes("changeVolume(")) {
                        const volumeMatch = response.match(/changeVolume\((.*?)\)/);
                        if (volumeMatch && volumeMatch[1]) {
                            const volumeValue = parseFloat(volumeMatch[1]);
                            if (volumeValue >= 0 && volumeValue <= 1) {
                                calmingMusic.volume = volumeValue; // Set the volume
                                console.log(`Volume changed to: ${volumeValue}`);
                            } 
                        }
                        cleanResponse = cleanResponse.replace(/changeVolume\((.*?)\)/, "");
                    }

                    appendMessage(cleanResponse, 'bot'); 
                    chatHistory += `Soham's Clone: ${cleanResponse}\n`;
                    console.log(chatHistory);
                
                
                }
            );
                
            }, 2000);
        }
    }
}

var currentImageIndex = 0;
var currentImageContainer = null;

async function checkApiAvailability(url) {
    try {
        const response = await fetch(url+"generate-tags");
        return response.ok; // Returns true if response is successful
    } catch (error) {
        console.error('API check failed:', error);
        return false; // Returns false if the request fails
    }
}

async function geminiResponse(message) {
    try {
        const url = await checkApiAvailability(apiUrl) ? fallbackApiUrl : apiUrl;
        console.log(url)
        const response = await fetch(`${url}/generate-tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message , chatHistory }),
        });

        // Parse the JSON response
        const data = await response.json();

        // Log the response for debugging
        console.log("Response from server:", data);

        // Return the text property from the server's response
        return data.text;
    } catch (error) {
        console.error("Error in geminiResponse:", error);
        return "Sorry, I couldn't process your request.";
    }
}

function appendResume(src, resumeContainer) {
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer.classList.contains('hidden')) {
        messagesContainer.classList.remove('hidden');
    }

    const resumeElement = document.createElement('a');
    resumeElement.href = src;
    resumeElement.target = "_blank"; // Open in new tab
    resumeElement.className = 'resume';
    const resumeLabel = document.createElement('p');
    resumeLabel.textContent = "View resume.pdf";
    const resumeIcon = document.createElement('i');
    resumeIcon.className = 'fas fa-file-pdf';
    resumeIcon.style.color = "white";

    resumeContainer.appendChild(resumeElement)
    resumeElement.appendChild(resumeLabel)
    resumeElement.appendChild(resumeIcon);
    
    messagesContainer.appendChild(resumeContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

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
        currentImageIndex = Array.prototype.indexOf.call(imageContainer.children, imageElement);
        currentImageContainer = imageContainer;
        modalContent.src = imageElement.src;
        imageViewer.style.display = 'block';
        imageCounter.textContent = `${currentImageIndex + 1}` + " of " + `${imageContainer.children.length}`;
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
    // check if index exists
    if (currentImageContainer.children[currentImageIndex - 1]) { 
        currentImageIndex--;
        modalContent.src = currentImageContainer.children[currentImageIndex].src;
        imageCounter.textContent = `${currentImageIndex + 1}` + " of " + `${currentImageContainer.children.length}`;
    }
});

nextBtn.addEventListener('click', function () {
    // check if index exists
    if (currentImageContainer.children[currentImageIndex + 1]) { 
        currentImageIndex++;
    modalContent.src = currentImageContainer.children[currentImageIndex].src;
    console.log(modalContent.src)
    imageCounter.textContent = `${currentImageIndex + 1}` + " of " + `${currentImageContainer.children.length}`;
    } 
});



function appendMessage(content, sender) {
    
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer.classList.contains('hidden')) {
        messagesContainer.classList.remove('hidden');
    }
    
    //fade in animation (in faade-in class)
    

    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.innerHTML = content;
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

// Speech-to-Text (Web Speech API)
const micButton = document.getElementById('micButton');
const userInput = document.getElementById('userInput');

let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false; 
  recognition.maxAlternatives = 1;

  micButton.addEventListener('click', () => {
    recognition.start();
    micButton.classList.add('listening'); 
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript; 
    userInput.value = transcript;
    sendMessage(); 
  });

  recognition.addEventListener('end', () => {
    micButton.classList.remove('listening');
  });

  recognition.addEventListener('error', (event) => {
    console.error('Speech recognition error:', event.error);
    micButton.classList.remove('listening');
  });
} else {
  console.warn('SpeechRecognition is not supported in this browser.');
  micButton.style.display = 'none'; 
}