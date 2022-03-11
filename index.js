const { Client, Intents } = require("discord.js");
const axios = require('axios');
const config = require("./config.json");

const intents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]);
const client = new Client({ intents: intents });

const discordPrefix = "!";

client.once('ready', () => {
	console.log('Ready!');
});

client.on("messageCreate", async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(discordPrefix)) return;
  
    const commandBody = message.content.slice(discordPrefix.length).toLowerCase();
  
    if (commandBody === 'help' || commandBody === 'h') {
        console.log('Help');
        message.reply('U kan iuse befehls laik: !word or !sentence or sogar !noun');
    }

    if (commandBody === 'word') {
        let word = await GetRandom('word');

        console.log('Loaded word: ' + word);
        message.reply(word);
    }

    if (commandBody === 'noun') {
        let word = await GetRandom('word/noun');

        console.log('Loaded noun: ' + word);
        message.reply(word);
    }

    if (commandBody === 'sentence') {
        let sentence = await GetRandom('sentence');

        console.log('Loaded sentence: ' + sentence);
        message.reply(sentence);
    }
});

client.login(config.BOT_TOKEN);

async function GetRandom(param){
    var reqConfig = {
        method: 'get',
        url: `${config.API_URL}/${param}`,
    };
    
    try {
        let response = await axios(reqConfig);

        return response.data;
    } catch (error) {
        console.error(error);
        return 'Sorry, I crashed';
    }
}