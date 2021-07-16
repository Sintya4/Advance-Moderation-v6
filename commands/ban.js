const { Message, Client, MessageEmbed } = require("discord.js");
const fs = require('fs')
module.exports.config = {
    name: "ban",
    aliases: ['b'],
    usage: "ban [@user] <reason>",
    example: ".ban @Slayer Shitposting in chat",
    permissions: ['BAN_MEMBERS'],
    botperms: ['EMBED_LINKS', "KICK_MEMBERS"],
    group: "moderation",
    description: "Bans mentioned member",
    guildOnly: true
};

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {
   const member = message.mentions.members.first() ? message.mentions.members.first() : args[0];

   if (!member) return message.channel.send(client.main);

   const reason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No reason given"

   let mm ;
   try {
   if (member === args[0]) {
        mm = await message.guild.members.fetch(args[0]);
   } else mm = await message.mentions.members.last();
} catch {

}

   if (!mm) return message.channel.send(client.noMember);

   if (mm.id === client.user.id) return message.channel.send(client.main)


    if (message.guild.members.cache.has(mm.id)) {
   if (mm.roles.highest.position > message.member.roles.highest) {
       if (message.member.id !== message.guild.ownerID) {
       return message.channel.send(client.higherRole);
       }
    }
   if (mm.hasPermission('MANAGE_MESSAGES')) return message.channel.send(client.userstaff);
    }

   message.guild.members.ban(mm.id, {reason: reason}).then(() => {

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

       const kicked = new MessageEmbed()
       .setColor(client.color)
       .setDescription(`${client.success} _${mm.user.username} has been banned_`)
       message.channel.send(kicked);
   }).catch((e) => {
    console.log(e)
    const failed = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} _Failed to ban ${mm.user.username}_`)

       message.channel.send(failed);
   })
}