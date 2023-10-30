import { configYaml } from './conf.js';

import TelegramBot from 'node-telegram-bot-api';
import { keyboardStart, keyboardMarkup } from "./keybords.js"


const bot = new TelegramBot(configYaml.API_KEY_BOT, {

    polling: {
        interval: 300,
        autoStart: true
    }

});

bot.on("polling_error", err => console.log(err.data.error.message));

bot.on('text', async msg => {
    if (msg.text == '/start') {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, 'Это бот - портфолио. Что хотите посмотреть?', {
            reply_markup: {
                inline_keyboard: keyboardStart
            }
        });
    }


    //  await bot.sendMessage(msg.chat.id, msg.text);
})
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'markupKeyboard') {
        bot.sendMessage(chatId, 'Работы', {
            reply_markup: {
                inline_keyboard: keyboardMarkup
            }
        });

        return;

    }

    if (query.data === 'reactKeyboard') {

    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {

            reply_markup: {
                inline_keyboard: keyboardStart
            }
        });
    }
});