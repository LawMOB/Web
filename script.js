const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== "") {
        socket.emit("chat message", message);
        addMessage("me", message);
        messageInput.value = "";
    }
}

socket.on("chat message", (msg) => {
    addMessage("other", msg);
});

function addMessage(type, message) {
    const div = document.createElement("div");
    div.classList.add(type);
    div.textContent = message;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
