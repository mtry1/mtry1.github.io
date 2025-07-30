(function() {
  const messages = document.getElementById('messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const apiKeyInput = document.getElementById('api-key');
  const modelSelect = document.getElementById('model');
  const temperatureInput = document.getElementById('temperature');

  // Load saved settings
  apiKeyInput.value = localStorage.getItem('apiKey') || '';
  modelSelect.value = localStorage.getItem('model') || 'openai/gpt-3.5-turbo';
  temperatureInput.value = localStorage.getItem('temperature') || '1';

  function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = 'msg ' + role;
    div.textContent = text;
    div.addEventListener('click', function() {
      navigator.clipboard.writeText(text);
    });
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;
    appendMessage('user', userText);
    input.value = '';
    appendMessage('assistant', '...');

    // Save settings
    localStorage.setItem('apiKey', apiKeyInput.value);
    localStorage.setItem('model', modelSelect.value);
    localStorage.setItem('temperature', temperatureInput.value);

    const apiKey = apiKeyInput.value;
    fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey ? 'Bearer ' + apiKey : ''
      },
      body: JSON.stringify({
        model: modelSelect.value,
        messages: [
          { role: 'user', content: userText }
        ],
        temperature: parseFloat(temperatureInput.value)
      })
    })
    .then(res => res.json())
    .then(data => {
      messages.lastChild.textContent = data.choices && data.choices[0].message.content || '出错了';
    })
    .catch(() => {
      messages.lastChild.textContent = '请求失败';
    });
  });
})();
