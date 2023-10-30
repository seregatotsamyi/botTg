const fs = require('fs')
const YAML = require('yaml')
const TelegramBot = require('node-telegram-bot-api');



const configFile = fs.readFileSync('./config.yml', 'utf8')

const configYaml = YAML.parse(configFile)

const bot = new TelegramBot(configYaml.API_KEY_BOT, {

    polling: {
        interval: 300,
        autoStart: true
    }

});

bot.on("polling_error", err => console.log(err.data.error.message));

bot.on('text', async msg => {

    console.log(msg);
    await bot.sendMessage(msg.chat.id, msg.text);

})