const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "modlogs",
    description: "Get all recent modlogs done on a user by a moderator",
    group: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    usage: '.modlogs [@user]',
    example: '.modlogs @Slayer'
}

module.exports.run = async(client, message, args) => {
    const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!member) return message.channel.send(client.main);

    let mm ;
    
    try {
    if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { }

    if (!mm) return message.channel.send(client.noMember);

    const modlogs = require('../database/userlogs.json')

    if (!modlogs[mm.id]) {
        if (!modlogs[mm.id][message.guild.id]) {
            return message.channel.send(client.noUserDB)
        }
        return message.channel.send(client.noUserDB)
    }

    const curLogs = modlogs[mm.id][message.guild.id].logs;

    const mainEmbed = new MessageEmbed()
    .setAuthor(mm.user.username,mm.user.displayAvatarURL())
    .setColor(client.color)
    .setDescription(`\`${curLogs}\` total modlogs found`)

    message.channel.send(mainEmbed);
}