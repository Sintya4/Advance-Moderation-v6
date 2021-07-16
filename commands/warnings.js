const { MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "warnings",
    permissions: ['MANAGE_MESSAGES'],
    aliases: ['warns'],
    description: "Check the warnings of a user.",
    usage: '.warnings [@user]',
    example: '.warnings @Slayer',
    guildOnly: true,
    group: 'moderation'
}

const file = require('../database/warns.json')

module.exports.run = async (client, message, args) => {
    const userInput = message.mentions.users.last() ? message.mentions.users.last() : args[0]

    if (!userInput) return message.channel.send(client.main);

    let mm ;
    try {
   if (userInput === args[0]) mm = await client.users.fetch(args[0]); else mm = await message.mentions.users.last();
    } catch {

    }
   if (!mm) return message.channel.send(client.noMember);
   if (mm.id === client.user.id) return message.channel.send(client.main)

    if (!file[mm.id]) {
        try {
        if (!file[mm.id][message.guild.id]) {
            return message.channel.send(client.userNoWarns);
        }
    } catch {
        
    }
        return message.channel.send(client.userNoWarns);
    }

   const warningsEmbed = new MessageEmbed()
   .setColor(client.color)
   .setDescription(`Warnings for **${mm.username}**: \n \n \`${require('../database/warns.json')[mm.id][message.guild.id].warns}\` Warnings found`)

   message.channel.send(warningsEmbed);
}