const dotenv = require('dotenv');
dotenv.config()

const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const { keyboardStart, keyboardMarkup } = require('./app/keybords')

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start(async(ctx, next) => {
    await ctx.reply('Привет! Это мой (@seregatot) личный бот портфолио, котрый помогает мне демонтсрировать мои проекты. Выберите, какие мои бы проекты вы бы хотели посмотреть:', {
        reply_markup: {
            inline_keyboard: keyboardStart
        }
    });
    await next()

})

bot.action('markupKeyboard', async(ctx, next) => {

    await ctx.reply('Портфолио markup', {
        reply_markup: {
            inline_keyboard: keyboardMarkup
        }
    });
    await ctx.answerCbQuery()
    await next()
});



bot.help((ctx) => ctx.reply('Свяжитесь со мной https://t.me/seregatot'))



bot.launch()
    // Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))