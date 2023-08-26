document.addEventListener("DOMContentLoaded", function() {
    const messagesContainer = document.getElementById("messagesContainer");
    const messageHistory = [];
    const SECONDS_TO_CLEAR_CHAT = 60;

    cef.emit("game:hud:setComponentVisible", "interface", false);
    cef.emit("game:hud:setComponentVisible", "radar", false);
    
    cef.on("game:hud:newVisibleState", (success) => {
        cef.hide(!success);
    });
    
    cef.on('pwd:chat', (hexColor, name, userText) => {
        // Добавляем новое сообщение в историю
        messageHistory.push({ color: hexColor, name: name, text: userText });
        // Если количество сообщений превысило лимит, удаляем самое старое
        if (messageHistory.length > 5) {
            messageHistory.shift(); // Удаляем первый элемент (самое старое сообщение)
        }
    
        if (messageHistory.length > 0) {
            setTimeout(() => {
                messageHistory.pop(); // Удаляем последнее сообщение из истории
                updateMessagesDisplay(); // Обновляем отображение сообщений
            }, 1000 * SECONDS_TO_CLEAR_CHAT);
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
            <p>
				<strong class="name" style="color: #${message.color}; font-family: 'Roboto'; position: absolute; top: 75px;">${message.name}</strong> <span class="text" style="color: white; font-family: 'Roboto'; position: absolute; top: 75px; left: 185px;">${message.text}</span>
			</p>
        `;
    
        messagesContainer.appendChild(messageElement);
  
        setTimeout(() => {
          messageElement.style.opacity = 1; // Восстанавливаем прозрачность
        }, 0);
      }
  
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
      if (messageHistory.length > 0) {
          setTimeout(() => {
              const lastMessage = messagesContainer.querySelector('.message:last-child');
              if (lastMessage) {
                  lastMessage.style.opacity = 0.5; // Снижаем прозрачность
              }
          }, 1000*30);
      }
    }
  
  });