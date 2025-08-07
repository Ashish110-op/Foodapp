async function sendMessage() {
      const userInput = document.getElementById('chat-input');
      const log = document.getElementById('chat-log');
      const message = userInput.value.trim();
      if (!message) return;

  console.log("Sending message:", userInput.value);
  const userMsg = userInput.value.trim();

  log.innerHTML += `<div><b>You:</b> ${message}</div>`;
  userInput.value = '';

  try {
    const res = await axios.post('http://localhost:3000/api/chat', {
      message: userMsg
    });

    const message = res?.data?.candidates[0].content?.parts[0]?.text || "No response from AI.";
    if (!res) {
      throw new Error(`HTTP error! Status`);
    }

    // const data = await res.json();
    log.innerHTML += `<div><b>Bot-AI:</b> ${message}</div>`;
    log.scrollTop = log.scrollHeight;
  } catch (err) {
    console.error('Fetch error:', err);
    log.innerHTML += `<div><b>Bot-AI:</b> Error getting response.</div>`;
  }
    }

    document.getElementById("chat-input").addEventListener('keydown',function(e){
      if(e.key === 'Enter'){
        sendMessage();
      }
    });

    // Meal Request Form
    document.getElementById('need-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await fetch('/api/request', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Meal request sent!');
      e.target.reset();
    });

    // Donation Form
    document.getElementById('donate-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await fetch('/api/donate', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Thanks for donating!');
      e.target.reset();
    });