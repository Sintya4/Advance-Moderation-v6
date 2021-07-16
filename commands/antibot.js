const file = require('../database/antibot.json')
const { MessageEmbed } = require('discord.js');
const fs  = require('fs')

module.exports.config = {
    name: 'antibot',
    aliases: ['anti-bot'],
    permissions: ['MANAGE_GUILD'],
 //   botperms: ['KICK_MEMBERS'],
    description: 'Enable/disable antibot',
    group: 'management',
    usage: '.antibot [function] <bot_punishment> <user_punishment>',
    example: '.antibot ?on kick remove_roles'
}

module.exports.run = async(client, message, args) => {
    const func = args[0];
    if (!func) return message.channel.send(client.main)
    if (!['?on', "?off"].includes(func)) return message.channel.send(client.main);


    if (func === '?on') {

    let bot_punish = args[1];
    if (!bot_punish) bot_punish = 'kick'
    if (!['ban', 'kick'].includes(bot_punish)) return message.channel.send(client.incorrectOP)

    let user_punish = args[2];
    if (!user_punish) user_punish = 'remove_roles';
    if (!['remove_roles', 'ban', 'kick'].includes(user_punish)) return message.channel.send(client.incorrectUserPunish)




    file[message.guild.id] = {
        func: true,
        settings: {
            user_punish: user_punish,
            bot_punish: bot_punish
        }
    }

    fs.writeFile('./database/antibot.json', JSON.stringify(file, null , 2), (err) => {
        if (err) {

        }
    })

    const changed = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.success} anti bot is now \`enabled\` with \`${user_punish}\` as the user punishment and \`${bot_punish}\` as the bot punishment`)

    message.channel.send(changed);
};


    if (func === '?off') {
        file[message.guild.id] = {
            func: false,
            settings: {
                user_punish: "none",
                bot_punish: 'none'
            }
        }
        fs.writeFile('./database/antibot.json', JSON.stringify(file, null, 2), (err) => {})
   
        const disabled = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.success} anti bot is now \`disabled\``)

        message.channel.send(disabled);

    }
}