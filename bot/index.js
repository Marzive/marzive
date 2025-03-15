const { Telegraf } = require('telegraf');
const bot = new Telegraf('7821663618:AAFw5br3c45sPZm0wNltv3Eq1Zno_ibo2-g'); // Replace with your token

bot.start((ctx) => {
  ctx.reply('Welcome!', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Open Mini App', web_app: { url: 'https://your-mini-app-url.com' } }]],
    }, 
  });
});

bot.launch();
console.log('Bot started');
