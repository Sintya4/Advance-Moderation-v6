const { MessageEmbed, Client, Message } = require('discord.js');

module.exports.config = {
    name: "help",
    group: "info",
    usage: 'help',
    guarded: true,
    example: ".help",
    botperms: ["EMBED_LINKS"],
    description: "Help menu for all commands"
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {

        try {
            let pu = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]))

            if (client.commands.has(args[0]) || client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))) {


                                 return message.channel.send(`
    
${pu.config.name ? `**Name:** ${pu.config.name}` : ""}${pu.config.description ? '\n' : ""}${pu.config.description ? `**Description:** ${pu.config.description}` : ""}${pu.config.aliases ? '\n' : ""}${pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ""}${pu.config.group ? '\n' : ""}${pu.config.group ? `**Group:** ${pu.config.group}` : ""}${pu.config.permissions ? '\n' : ''}${pu.config.permissions ? `**Permissions:** ${pu.config.permissions.join(', ').toLocaleLowerCase()}` : ""}${pu.config.usage ? '\n' : ""}${pu.config.usage ? `**Usage:** ${pu.config.usage}` : ""}${pu.config.example ? "\n" : ""}${pu.config.example ? `**Example:** ${pu.config.example}` : ""}                             

                `)

            } else {

            }
        } catch {
        }
                

    if (!args[0]) {
        let embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle("Moderation bot")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Type \`help [command]\` for help with a command \n\n ${client.prefix}help moderation - **Moderator Commands.** \n ${client.prefix}help fun - **Fun commands** \n ${client.prefix}help management - **Management Commands**  \n${client.prefix}help misc - **Misc Commands.** \n ${client.prefix}help info - **Shows information commands.**  \n ${client.prefix}help config - **Shows all config setting commands**`, true)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
    message.channel.send(embed)
    };

     if (args[0] === 'fun') {
        let fun = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'fun') fun.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const funEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Fun commands_** \n\n ${fun.join('\n')}`)

        message.channel.send(funEmbed);
     };

     if (args[0] === 'misc') {
         let misc = [];

         client.commands.forEach((command) => {
            if (command.config.group === 'misc') misc.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const miscEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Misc commands_** \n\n ${misc.join('\n')}`)

        message.channel.send(miscEmbed);

     }

     if (args[0] === 'management') {
        let mnge = [];
     
        client.commands.forEach((command) => {
           if (command.config.group === 'management') mnge.push(`\`${command.config.name}\` - ${command.config.description}`);
       })

       const managementEmbed = new MessageEmbed()
       .setColor(client.color)
       .setDescription(`**Management commands_** \n\n ${mnge.join('\n')}`)

       message.channel.send(managementEmbed);
     }


     if (args[0] === 'config') {
         let configuration = [];
     
         client.commands.forEach((command) => {
            if (command.config.group === 'config') configuration.push(`\`${command.config.name}\` - ${command.config.description}`);
        })

        const configEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Config commands_** \n\n ${configuration.join('\n')}`)

        message.channel.send(configEmbed);

        }

    if (args[0] === 'info' || args[0] === 'information') {
        let infoo = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'info') infoo.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const infoEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Info commands_** \n\n ${infoo.join('\n')}`)

        message.channel.send(infoEmbed);
    }
    if (args[0] === 'moderation') {
        let mod = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'moderation') {
                mod.push(`\`${command.config.name}\` - ${command.config.description}`);
            }
            });

        const modEmbed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`**_Moderation commands_** \n\n ${mod.join('\n')}`)

        message.channel.send(modEmbed);
    }
}