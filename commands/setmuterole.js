const { Message, Client, MessageEmbed } = require("discord.js");
const fs = require('fs')

module.exports.config = {
    name: "setmuterole",
    aliases: ['setmrole'],
    usage: "setmuterole [@role]",
    example: ".setmuterole @Muted",
    permissions: ["MANAGE_GUILD"],
    botperms: ['EMBED_LINKS', "MANAGE_ROLES"],
    group: "config",
    description: "Set the mute role for the server",
    guildOnly: true
};

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    const role = message.mentions.roles.first() ? message.mentions.roles.first() : args[0]

    if (!role) return message.channel.send(client.main)

    let mm ;
    if (role === args[0]) mm = await message.guild.roles.fetch(args[0]); else mm = await message.mentions.roles.first();


    const file = require('../database/muterole.json');

    file[message.guild.id] = {
        role: mm.id
    }

    fs.writeFile('./database/muterole.json', JSON.stringify(file, null, 2), () => {

    })

    const success = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.success} Set mute role to \`${mm.name}\``)

    message.channel.send(success);
}
