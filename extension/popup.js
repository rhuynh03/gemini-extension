document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("messageInput");
  const sendMessage = document.getElementById("sendMessage");
  const responseDiv = document.getElementById("response");

  sendMessage.addEventListener("click", async () => {
    const message = messageInput.value.trim();
    if (!message) return;

    responseDiv.innerHTML = "Thinking...";

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      responseDiv.innerHTML = `<strong>Response:</strong> ${data.reply}`;
    } catch (error) {
      responseDiv.innerHTML = "Error connecting to AI.";
    }
  });
});
