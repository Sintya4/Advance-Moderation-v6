const { Client, Message } = require("discord.js")
module.exports.config = {
    name: "clone",
    description: "Clone a message",
    usage: ".clone <message>",
    example: '.clone Hello world',
    group: 'fun',
    botperms: ['MANAGE_WEBHOOKS'],
    guildOnly: true
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    if (!args.join(' ')) return message.channel.send(client.main)
    message.delete();
    message.channel.createWebhook(`${message.author.username}`, { avatar: message.author.displayAvatarURL(), reason: "Clone command" }).then((webhook) => {
        webhook.send(args.join(' '));
        setTimeout(() => {
            webhook.delete();
        }, 1000);
    });
};