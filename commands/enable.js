const { MessageEmbed, Collection } = require('discord.js');
const fs = require('fs')
module.exports.config = {
    name: "enable",
    guarded: true,
    description: "Enable a disabled command",
    permissions: ["MANAGE_GUILD"],
    group: 'config',
    aliases: ['enable-cmd'],
    example: '.enable ban',
    usage: '.enable <command>',
    botperms: ["EMBED_LINKS"],
    guildOnly: true

}

module.exports.run = async (client, message, args) => {
    const command = args[0];

    if (!command) return message.channel.send(client.main);



    if (!client.commands.has(command)) {
        var cantFind = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`No such command as \`${command}\``)
        // if (!client.commands.get(client.aliases.get(command))) {
        message.channel.send(cantFind);
        return;
        // };
    };
    let cmd = client.commands.get(command);
    //  if (require('../database/enables.json')[command]) {
    //  };



    if (require('../database/enables.json')[command]) {
        if (require('../database/enables.json')[command][message.guild.id] === false) {
            return message.channel.send(client.alreadyEnabled);
        }
    }

    if (cmd.config.guarded) {
        if (cmd.config.guarded === true) {
            return message.channel.send(client.guarded);
        }
    }

    const file = require('../database/enables.json');

    if (!file[command]) {
        file[command] = {}
        fs.writeFile('./database/enables.json', JSON.stringify(file, null, 2), (err) => {

        })
    }

    file[command][message.guild.id] = false;

    fs.writeFile('./database/enables.json', JSON.stringify(file, null, 2), (err) => {
        if (err) {

        }
    })

    let done = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.success} The ${command} command has been enabled`);

    message.channel.send(done);





}