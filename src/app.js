require('dotenv').config();
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(TOKEN, {polling: true});

const captureTerms = [{
  regex: /.*papel(ã|a)o.*/ig,
  audio: `https://www.myinstants.com/media/sounds/que-papelao-hein-vai-dar-namoro-2022.mp3`
}, {
  regex: /.*tome.*/ig,
  audio: `https://www.myinstants.com/media/sounds/tome-vai-dar-namoro.mp3`,
}, {
  regex: /.*rapaz.*/ig,
  audio: `https://www.myinstants.com/media/sounds/vinheta-xaropinho-rapaz_dx3f4Be.mp3`
}, {
  regex: /.*ele gosta.*/ig,
  audio: `https://www.myinstants.com/media/sounds/ele-g0sta.mp3`
}, {
  regex: /.*u+i.*/ig,
  audio: `https://www.myinstants.com/media/sounds/uuuii-vai-dar-namoro-2022.mp3`
}, {
  regex: /.*cava+lo.*/ig,
  audio: `https://www.myinstants.com/media/sounds/cavaalo0.mp3`
}, {
  regex: /.*dema+is.*/ig,
  audio: `https://www.myinstants.com/media/sounds/demaals.mp3`
}, {
  regex: /.*(kk+|ha(ha)+).*/ig,
  audio: `https://www.myinstants.com/media/sounds/risada-atumalaca-vai-dar-namoro.mp3`
}, {
  regex: /.*(dan(ç|c)a|gatinho).*/ig,
  audio: `https://www.myinstants.com/media/sounds/danca-gatinho-vai-dar-namoro.mp3`
}, {
  regex: /.*sem gra(c|ç)a.*/ig,
  audio: `https://www.myinstants.com/media/sounds/que-cara-mais-sem-graca-vai-dar-namoro-2022.mp3`
}, {
  regex: /.*pare.*/ig,
  audio: `https://www.myinstants.com/media/sounds/pare-vai-dar-namoro.mp3`
}, {
  regex: /.*xi+.*/ig,
  audio: `https://www.myinstants.com/media/sounds/xiii-vai-dar-namoro-2022.mp3`
}, {
  regex: /.*mam(a|ã)e+.*/ig,
  audio: `https://www.myinstants.com/media/sounds/aii-mamae.mp3`
}, {
  regex: /.*abr(ua)+.*/ig,
  audio: `https://www.myinstants.com/media/sounds/auhbrauhlb-vai-dar-namoro.mp3`
}, {
  regex: /.*che+ga+.*/ig,
  audio: `https://www.myinstants.com/media/sounds/ch3ga.mp3`
}, {
  regex: /.*i+rra+.*/ig,
  audio: `https://www.myinstants.com/media/sounds/iiirraa-vai-dar-namoro-2022.mp3`
}, {
  regex: /.*(calma|meu filho|que isso).*/ig,
  audio: `https://www.myinstants.com/media/sounds/que-isso-meu-filho-calma-vai-dar-namoro-2022.mp3`
}, {
  regex: /.*brincadeira.*/ig,
  audio: `https://www.myinstants.com/media/sounds/e-brincadeira-ein-vai-dar-namoro-2022.mp3`
}, {
  regex: /.*t(a|á) bom.*/ig,
  audio: `https://www.myinstants.com/media/sounds/tao-ta-bom-vai-dar-namoro.mp3`
}, {
  regex: /.*n(a|ã)o.*/ig,
  audio: `https://www.myinstants.com/media/sounds/nao-vai-dar-namoro-2022.mp3`
}];

const sendReply = (msg, term) => {
  const chatId = msg.chat.id;

  if (term.audio != null) {
    bot.sendAudio(chatId, term.audio)
  } else if (term.text != null) {
    bot.sendMessage(chatId, term.text);
  }
}

bot.on('message', (msg) => {
  captureTerms
    .filter(term => term.regex.test(msg.text.toString()))
    .forEach(term => sendReply(msg, term));
});
