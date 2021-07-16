const { MessageEmbed } = require("discord.js")

module.exports.config = {
    name: "settings",
   // aliases: ['settings'],
    group: 'management',
    description: "View all configuration settings",
    usage: '.config',
    example: '.config'
}

module.exports.run = async(client, message, args) => {

    let modLogsChannel = 'None';

    let modlogs = require('../database/modlogs.json')[message.guild.id];
    if (modlogs) {
        modLogsChannel = `<#${modlogs.channel}>`;
    }

    let mRole = 'None';

    let muteRole = require('../database/muterole.json')[message.guild.id];
    if (muteRole) {
        mRole = `<@&${muteRole.role}>`
    }

    let serverPrefix = client.prefix;

    let anti_bot = '`Disabled`'

    let antibot = require('../database/antibot.json')[message.guild.id];
    if (antibot) {
        anti_bot = `\`${antibot.func}\``
    };


    const em = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`Configuration settings for **${message.guild.name}** \n \n `)
    .addFields(
        {
            name: 'Mod logs',
            value: modLogsChannel
            , inline: true
        },
        {
            name: 'Mute role',
            value: mRole,
            inline: true
        },
        {
            name: 'Server prefix',
            value: '`'+ serverPrefix + '`',
            inline: true
        },
        {
            name: 'Anti bot',
            value: anti_bot,
            inline: true
        }
    )

    message.channel.send(em)

}