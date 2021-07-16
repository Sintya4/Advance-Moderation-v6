
const { Client, Message, MessageEmbed } = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async(client, message) => {
    if (message.author.bot) return;

    var prePrefix;
    if (require('../database/prefixes.json')[message.guild.id]) {
        prePrefix = await require('../database/prefixes.json')[message.guild.id].prefix;

    } else {
        prePrefix = mainPrefix
    }
    const escapeRegex = require('../utils/structure/exports/escapeRegex').escapeRegex
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prePrefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

    const [, prefix] = message.content.match(prefixRegex);


    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    if (!require('../database/modlogs.json')[message.guild.id]) return;
    let modLogsID  = require('../database/modlogs.json')[message.guild.id].channel;


    const cmd = args.shift().toLocaleLowerCase()

    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))

    if (commandFile) {
        try {
    const modLogsEmbed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`Used \`${cmd}\` command in <#${message.channel.id}> \n ${message.content}`)
    .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
    .setTimestamp()


        
    await message.guild.channels.cache.get(modLogsID).send(modLogsEmbed);
        } catch {
            
        }
}
}