const { Client } = require('discord.js');
const client = new Client();
const { token } = require('./config/bot.json')
const keepAlive = require('./keepAlive.js');

require('./utils/defines')(client);
require('./utils/structure/registery')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);

client.on('message', async(message) => {
    message.channel.messages.fetch()
require('./utils/handlers/handler')(client, message)
});

client.on('messageUpdate', (o, message) => {
require('./utils/handlers/editHandles')(client, message);
})

keepAlive();

client.login(process.env.TOKEN);