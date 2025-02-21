//------------Socket.IO client (Chat)----------------------
const socket = io();

// Modaaliikkunan avaaminen/sulkeminen
const chatButton = document.getElementById("chat-button");
const chatModal = document.getElementById("chat-modal");
const closeChat = document.getElementById("close-chat");
let user = "";

// Modaaliikkuna chatkäyttäjän nimen kysymiseksi
function askForUsername() {
  return new Promise((resolve, reject) => {
    const modal = document.getElementById("customPrompt");
    modal.style.display = "flex";

    window.resolvePrompt = function () {
      let userInput = document.getElementById("promptInput").value.trim();
      if (userInput) {
        modal.style.display = "none";
        resolve(userInput);
      } else {
        alert("Enter your name!");
      }
    };

    window.rejectPrompt = function () {
      modal.style.display = "none";
      reject("The user cancelled the name entry.");
    };
  });
}

async function startChat() {
  try {
    // Call the name request before starting the chat
    user = await askForUsername();
    
    // 👇 Here we continue executing the code after entering the name
    chatModal.style.display = "block";
    socket.emit("join", user); // Sending a chat entry event to the server
  } catch (error) {
    console.log(error);
  }
}

// Socket.IO-yhteyden muodostus
chatButton.addEventListener("click", () => {
  startChat();
});

closeChat.addEventListener("click", () => {
  socket.emit("leave", user); // Sending a chat exit event to the server
  user = "";
  chatModal.style.display = "none";
});
// Viestin lähetyskäsittelijä
document.getElementById("send-message").addEventListener("click", sendMessage);

// Sending messages by pressing "Enter"
document.getElementById("chat-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Preventing line breaks
    sendMessage();
  }
});
  
function sendMessage() {
  const messageInput = document.getElementById("chat-input");
  const text = messageInput.value.trim();

  if (text) {
    socket.emit("message", { sender: user, text }); // Lähetetään palvelimelle
    messageInput.value = ""; // Syöttökentän tyhjennys
  }
};

// Käsittelijä viestin vastaanottamiseen palvelimelta
if (!window.socketInitialized) {
  window.socketInitialized = true;
  socket.off("message"); // Poistaa edellisen käsittelijän ennen uuden lisäämistä

  socket.on("message", (data) => {
    if (data.sender !== user) {
      addMessage(`${data.sender}: ${data.text}`); // Lisäämme vain muiden ihmisten viestejä
    } else {
      addMessage(`You: ${data.text}`); // Näytämme lähettäjälle "You"
    }
  });

  // Käsitellään käyttäjien sisään-/uloskirjautumisia
  socket.on("join", (name) => {
    addMessage(`🔵 ${name} joined the chat`);
  });

  socket.on("leave", (name) => {
    addMessage(`🔴 ${name} left the chat`);
  });
}

// Toiminto viestien lisäämiseksi chattiin
function addMessage(message) {
  const chatBox = document.getElementById("chat-content");
  const newMessage = document.createElement("p");
  newMessage.textContent = message;
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight; // Asettaa viestin viimeisimmäksi
}
//------------end Socket.IO client (Chat)----------------------

//--------------------Custom prompt----------------------------
function openPrompt() {
  document.getElementById("customPrompt").style.display = "flex";
}

function closePrompt() {
  document.getElementById("customPrompt").style.display = "none";
}

function submitPrompt() {
  let userInput = document.getElementById("promptInput").value;
  if (userInput.trim() !== "") {
    closePrompt();
  } else {
    alert("Enter something!");
  }
}