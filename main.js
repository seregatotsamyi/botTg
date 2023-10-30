const dotenv = require('dotenv');
dotenv.config()

const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const { keyboardStart, keyboardMarkup } = require('./app/keybords')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply('Привет! Это мой (@seregatot) личный бот портфолио, котрый помогает мне демонтсрировать мои проекты. Выберите, какие мои бы проекты вы бы хотели посмотреть:', {
        reply_markup: {
            inline_keyboard: keyboardStart
        }
    });
})

bot.action('markupKeyboard', (ctx) => {
    ctx.reply('Портфолио markup', {
        reply_markup: {
            inline_keyboard: keyboardMarkup
        }
    });
});

bot.help((ctx) => ctx.reply('Свяжитесь со мной https://t.me/seregatot'))
bot.launch()

bot.on(message('text'), async(ctx) => {
    // Explicit usage
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

    // Using context shortcut
    await ctx.reply(`Hello ${ctx.state.role}`)
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))