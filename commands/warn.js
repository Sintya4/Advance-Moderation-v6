const { v4 } = require('uuid')

const fs = require('fs')

const { Client, Message, MessageEmbed, MessageReaction } = require('discord.js');

module.exports.config = {
    name: "warn",
    description: "Warn a user",
    permissions: ['MANAGE_MESSAGES'],
    botperms: ['EMBED_LINKS'],
    group: 'moderation',
    aliases: ['w'],
    guildOnly: true,
    usage: '.warn [@user] <reason>',
    example: '.warn @Slayer Weirdo boy'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) =>  {
    const file = require('../database/warns.json');
    const uInput = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!uInput) return message.channel.send(client.main)

    let mm ;
    try {
    if (uInput === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch {
    }
  
   if (!mm) return message.channel.send(client.noMember);

   if (mm.id === client.user.id) return message.channel.send(client.main);

   if (mm.hasPermission("MANAGE_MESSAGES")) return message.channel.send(client.userstaff);


   if (!file[mm.id]) {
       file[mm.id] = {}
       fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {

    })
    }

    if (!file[mm.id][message.guild.id]) {
        file[mm.id][message.guild.id]  ={}
    }
    fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {

    })

    if (!file[mm.id][message.guild.id].warns) {
        file[mm.id][message.guild.id] = {
            warns: 0
        }
        fs.writeFile('./database/warns.json', JSON.stringify(file, null, 2), (err) => {

        })
    }

    file[mm.id][message.guild.id].warns++
    let curWrns = file[mm.id][message.guild.id].warns;
    let amtOfWarns;
    if (curWrns === 1) amtOfWarns = '1st'
    if (curWrns === 2) amtOfWarns = '2nd'
    if (curWrns === 3) amtOfWarns = '3rd'
    if (curWrns >= 4) amtOfWarns = `${curWrns}th`
    
   const warned = new MessageEmbed()
   .setColor(client.color)
   .setDescription(`${client.success} _Warned ${mm.username || mm.user.username} | This is their ${amtOfWarns} warning_`)


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

   message.channel.send(warned);


}