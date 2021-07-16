const { MessageEmbed, Collection } = require('discord.js');
const fs = require('fs')
module.exports.config = {
    name: "disable",
    guarded: true,
    description: "Disable a enabled command",
    permissions: ["MANAGE_GUILD"],
    group: 'config',
    aliases: ['disable-cmd'],
    example: '.enable ban',
    usage: '.disable <command>',
    botperms: ["EMBED_LINKS"],
    guildOnly: true

}

module.exports.run = async (client, message, args) => {
    const command = args[0];

    if (!command) return message.channel.send(client.main);



    if (!client.commands.has(command)) {
        var cantFind = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`${client.fail} No such command as \`${command}\``)
        // if (!client.commands.get(client.aliases.get(command))) {
        message.channel.send(cantFind);
        return;
        // };
    };
    let cmd = client.commands.get(command);
    //  if (require('../database/enables.json')[command]) {
    //  };



    if (require('../database/enables.json')[command]) {
        if (require('../database/enables.json')[command][message.guild.id] === true) {
            return message.channel.send(client.alreadyDisabled);
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

    file[command][message.guild.id] = true;

    fs.writeFile('./database/enables.json', JSON.stringify(file, null, 2), (err) => {
        if (err) {

        }
    })

    let done = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.success} The ${command} command has been disabled`);

    message.channel.send(done);





}