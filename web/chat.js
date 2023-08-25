let messagesContainer = document.getElementById('messagesContainer');
let messageHistory = []; // Массив для хранения истории сообщений

cef.emit("game:hud:setComponentVisible", "interface", false);
cef.emit("game:hud:setComponentVisible", "radar", true);

cef.on("game:hud:newVisibleState", (success) => {
	cef.hide(!success);
});

cef.on('pwd:chat', (name, userText) => {
    // Добавляем новое сообщение в историю
    messageHistory.push({ name: name, text: userText });

    // Если количество сообщений превысило лимит, удаляем самое старое
    if (messageHistory.length > 5) {
        messageHistory.shift(); // Удаляем первый элемент (самое старое сообщение)
    }

    // Обновляем отображение сообщений
    updateMessagesDisplay();
});

function updateMessagesDisplay() {
    messagesContainer.innerHTML = '';

    for (const message of messageHistory) {
        let messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <p><strong class="name">${message.name}</strong> <span class="text">${message.text}</span></p>
        `;
        messagesContainer.appendChild(messageElement);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


