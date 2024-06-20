const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');


const botToken = '6299444403:AAEBVWEmijpbvRndZ1mdRt7AEmGl--QXbeg';


const newsApiKey = '300dd27910fe4c56b070ed30000ac339';


const bot = new TelegramBot(botToken, { polling: true });


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name;
  
    const welcomeMessage = `Hello, ${firstName}! I'm a news bot. You can use the following commands:\n\n` +
      `/start - Start the bot\n` +
      `/news - Get the latest news articles`;
  
    bot.sendMessage(chatId, welcomeMessage);
  });


bot.onText(/\/news/, async (msg) => {
  try {
    
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
    );

    
    const articles = response.data.articles;

    
    articles.forEach((article) => {
      bot.sendMessage(msg.chat.id, `${article.title}\n\n${article.url}`);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    bot.sendMessage(msg.chat.id, 'An error occurred while fetching news.');
  }
});
