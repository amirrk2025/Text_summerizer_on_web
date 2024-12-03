document.getElementById("sendBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const chatBox = document.getElementById("chatBox");

    if (!userInput.trim()) {
        alert("Please enter a message!");
        return;
    }

    // Add user message to the chat
    const userMessage = document.createElement("div");
    userMessage.textContent = userInput;
    userMessage.className = "user";
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to the server
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "Summarize this text" },
                    { role: "user", content: userInput },
                ],
            }),
        });

        const data = await response.json();

        // Add AI response to the chat
        const aiMessage = document.createElement("div");
        aiMessage.textContent = data.choices[0].message.content;
        aiMessage.className = "ai";
        chatBox.appendChild(aiMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear input
        document.getElementById("userInput").value = "";
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});

