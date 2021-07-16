const fs = require('fs')

module.exports.config = {
    name: "setperms",
    aliases: ['setpermissions', 'setpermission'],
    description: "Set required permissions for a command",
    group: "config",
    permissions: ['MANAGE_GUILD'],
    usage: ".setperms [command] [permission]",
    example: '.setperms ban ban_members',
    guildOnly: true
}

const { Message, Client, MessageEmbed } = require('discord.js')

/**
 * @param {Message} message 
 * @param {Client} client
 */

module.exports.run = async(client, message, args) => {
    const command = args[0];
    if (!command) return message.channel.send(client.main);

    if (!client.commands.has(command) /**|| !client.commands.get(client.aliases.has(command))*/) {
        return message.channel.send(client.aintCommandSherlock)
    }

    

    const permissionUnL = args[1];
    const permission = permissionUnL.toLocaleUpperCase()
    if (!permission) return message.channel.send(client.main);

    let permissions = [
        "ADMINISTRATOR",
        "VIEW_AUDIT_LOG",
        "MANAGE_GUILD",
        "MANAGE_ROLES",
        "MANAGE_CHANNELS",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "CREATE_INSTANTE_INVITE",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_EMOJIS",
        "MANAGE_WEBHOOKS",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        'ADD_REACTIONS',
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD"  ,
        "NONE"
    ]

    if (!permissions.includes(permission)) {
        let msg = await message.channel.send('Incorrect type of permissions given \n\n `React to the message to see all permission types`');
         msg.react('✅').then(() => {
             client.on('messageReactionAdd', (reaction, user) => {
                 if (reaction.message.id !== msg.id) return;
                 msg.edit(`All permissions: \n \`${permissions.join('\n')}\``)
             })
         })
        return;
    };

    const file = require('../database/perms.json')

    if (!file[command]) {
        file[command] = {}
        fs.writeFile('./database/perms.json', JSON.stringify(file, null, 2), (err) => {
            if (err) {

            }
        })
    }

    file[command][message.guild.id] = permission

    fs.writeFile('./database/perms.json', JSON.stringify(file, null,2), (err) => {

    })

    const done = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.success} Permissions for \`${command}\` command is now \`${permission}\``)

    message.channel.send(done);



}