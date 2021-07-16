const fs = require('fs')
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: 'nickname',
    aliases: ['setnickname', 'set-nickname'],
    description: "Set the nickname of a user",
    usage: '.nickname [@user] [nickname]',
    example: '.nickname @Slayer Best coder ever',
    group: 'moderation'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async function(client, message, args) {
    const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    let mm ;
    try {
    if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch {}

    if (!mm) return message.channel.send(client.noMember);

    if (mm.id === client.user.id) return message.channel.send(client.main);

    const nickName = args.slice(1).join(' ');
    if (!nickName) return message.channel.send(client.main);

    if (!mm.manageable) {
        return message.channel.send(client.roleHigher);
    }

    mm.setNickname(nickName).then(() => {

        const userLogs = require('../database/userlogs.json')

    if (!userLogs[mm.id]) {
        userLogs[mm.id] = {};
        fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
 
        })
        if (!userLogs[mm.id][message.guild.id]) {
            userLogs[mm.id][message.guild.id] = {};
            fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
            
            })
        }
    }
 
    if (!userLogs[mm.id][message.guild.id].logs) {
        userLogs[mm.id][message.guild.id] = {
            logs: 0
        };
        fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
            
        })
    }
 
    userLogs[mm.id][message.guild.id].logs++
 
 
       fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
            
        })

        const changed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.success} _${mm.user.username} nickname is now ${nickName}_`)

        message.channel.send(changed);

    }).catch(() =>{
        const failed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.fail} _Failed to change members nickname_`)

        message.channel.send(failed);
    })


};