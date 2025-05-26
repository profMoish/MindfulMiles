const express = require("express");

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = 1825527066; // Можно получить у @userinfobot в Telegram
const reminders = [];

app.post(`/webhook/${TOKEN}`, (req, res) => {
  const update = req.body;
  
  if (update.message) {
    reminders.push(update.message.text);
    const chatId = update.message.chat.id;
    const text = update.message.text;
    console.log(`Message from ${chatId}: ${text}`);

  }

  res.sendStatus(200);

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: reminders[Math.floor(Math.random() * reminders.length)],
          reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🎯 Рандомная цель",
            callback_data: "random_goal"
          }
        ]
      ]
    }
    }),
  })
  .then(res => res.json())
  .then(json => {
    console.log('Ответ Telegram:', json);
  })
  .catch(err => {
    console.error('Ошибка:', err);
  });


});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

});


