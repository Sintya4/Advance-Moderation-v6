const modlogs = require('../database/modlogs.json');
const muteRole = require('../database/muterole.json');
const { Client, Message } = require('discord.js');
const fs = require('fs');
const { measureMemory } = require('vm');
const { setTimeout } = require('timers');

module.exports.config = { 
    name: "setup",
    group: 'management',
    description: "Sets up server for bot to run perfectly",
    permissions: ['MANAGE_GUILD'],
    botperms: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'EMBED_LINKS'],
    usage: '.setup',
    example: '.setup'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) =>{
    var modLogsChannelFound = false;
    message.channel.send(client.setupStart);

    message.guild.channels.cache.forEach((channel) => {
        if (channel.name.includes('modlogs')) {
            channel.send(client.setlogsChannel);
            modLogsChannelFound = true;
            modlogs[message.guild.id] = {
                channel: channel.id
            };
            fs.writeFile('./database/modlogs.json', JSON.stringify(modlogs), (err) => {
            
            })
        };
    })
    setTimeout(() => {


        if (modLogsChannelFound === false) {
            message.guild.channels.create('modlogs', {
                topic: "Logs for all moderators",
                type: 'text',
                permissionOverwrites: [{
                    id: message.guild.roles.everyone.id,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }, {
                    id: client.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }]
            }).then((ch) => {
                  ch.send(client.setlogsChannel)
                modlogs[message.guild.id] = {
                    channel: ch.id
                }
                fs.writeFile('./database/modlogs.json', JSON.stringify(modlogs), (err) => {
            
                })
            })
        };

        var muteRoleFound = false;

        message.guild.roles.cache.forEach((role) => {
            if (role.name.toLowerCase().includes("muted")) {
                 muteRoleFound = true;

                muteRole[message.guild.id] = {
                    role: role.id
                }

                fs.writeFile('./database/muterole.json', JSON.stringify(muteRole), (err) => {
            
                })

            }
        })
        setTimeout(() => {
            if (muteRoleFound === false) {
                message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: 0
                    }
                }).then((role)  => {
                    muteRole[message.guild.id] = {
                        role: role.id
                    }
                    fs.writeFile('./database/muterole.json', JSON.stringify(muteRole), (err) => {
            
                    })
                })
            }
            setTimeout(async() => {
                message.guild.channels.cache.forEach((channel) => {
                    channel.updateOverwrite(muteRole[message.guild.id].role, {
                            SEND_MESSAGES: false
                    })
                    channel.updateOverwrite(message.guild.roles.everyone.id, {
                        SEND_MESSAGES: null
                    })
                })
                if (message.guild.verificationLevel === 'NONE') {
                    try {
                    await message.guild.setVerificationLevel('LOW');
                    } catch {

                    }
                }
                setTimeout(() => {
                    message.channel.send(client.completeSetup)
                }, 500)
            }, 1000)
        }, 1000)



    }, 2000)


}