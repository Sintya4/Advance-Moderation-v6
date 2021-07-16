const { Client, Message, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "setmodlogs",
    aliases: ['setmodlog', 'setmlogs'],
    description: "Set the modlogs channel for the server",
    usage: ".setmodlogs [#channel]",
    permissions: ['MANAGE_GUILD'],
    example: '.setmodlogs #mod-logs',
    group: 'moderation'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {
    const channel = message.mentions.channels.first() ? message.mentions.channels.first() : args[0];

    if (!channel) return message.channel.send(client.main)

    let mm ;
    try {
    if (channel === args[0]) mm = await message.guild.channels.cache.get(args[0]); else mm = await message.mentions.channels.first();        
    } catch { }

    if (!mm) return message.channel.send(client.noChannel);
    const file = require('../database/modlogs.json');

    file[message.guild.id] = {
        channel: mm.id
    }

    const fs = require('fs')

    fs.writeFile('./database/modlogs.json', JSON.stringify(file), (err) => {

    });

    const setLogs = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.success} Set modlogs channel to ${channel.name}`)


    message.channel.send(setLogs);


};