const pp  = require('../database/prefixes.json');
const fs = require('fs');
const { MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "prefix",
    botperms: ["EMBED_LINKS"],
    permissions: ["MANAGE_GUILD"],
    group: "config",
    example: '.prefix !',
    usage: 'prefix <newPrefix>',
    description: "Set the prefix for the server",
    guildOnly: true
}

module.exports.run = async (client, message, args) => {
    let curPref;
    const curPrefGuild = require('../database/prefixes.json')[message.guild.id];
    if (!curPrefGuild) {
        curPref = client.config.prefix;
    } else {
        curPref = require('../database/prefixes.json')[message.guild.id].prefix;
    }
    const newPrefix = args[0];
    if (!newPrefix) {
        const curPrefix = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`Current prefix is: \`${curPref}\``)
        return message.channel.send(curPrefix);
    } else {
        pp[message.guild.id] = {
            prefix: newPrefix
        };
        const setPrefx = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.success} Prefix set to \`${newPrefix}\``)
        message.channel.send(setPrefx);
        fs.writeFile('./database/prefixes.json', JSON.stringify(pp), (err) => {
            if (err){

            }
        })
    }
}