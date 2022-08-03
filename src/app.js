const TelegramBot = require("node-telegram-bot-api");
const fs = require('fs');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(TOKEN, {polling: true});

const sendReply = (msg, term) => {
  const chatId = msg.chat.id;

  if (term.audio != null) {
    bot.sendAudio(chatId, term.audio)
  } else if (term.text != null) {
    bot.sendMessage(chatId, term.text);
  }
}

bot.on('message', (msg) => {
  fs.readFile(`./data/reply_data.json`, (err, data) => {
    if (err) throw err;
    
    const { reply_data: captureTerms } = JSON.parse(data);
    const messageText = msg.text.toString();

    const term = captureTerms
      .find(term => term.regex.some(rx => new RegExp(rx, 'i').test(messageText)))

    if (term != null)
      sendReply(msg, term);
  });
});

bot.on('polling_error', (err) => console.log(err));
