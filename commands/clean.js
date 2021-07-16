const { Client, Message } = require("discord.js")

module.exports.config = {
    name: "clean",
    group: 'moderation',
    description: 'Clean recent bot messages',
    permissions: ['MANAGE_MESSAGES'],
    botperms: ['MANAGE_MESSAGES'],
    usage: '.clean [amount]',
    example: '.clean 5'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {
    let amount = args[0];
    if (!amount) return message.channel.send(client.main);
    if (isNaN(amount)) return message.channel.send(client.amountNum);

    if (amount > 100) amount = 99

    let collection = await message.channel.messages.fetch({
        limit: amount
    })

    const filter = collection.filter(m => m.author.id === client.user.id);

    message.channel.bulkDelete(filter)
}