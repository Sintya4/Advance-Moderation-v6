const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "avatar",
    aliases: ['av'],
    cooldown: 5,
    group: "misc",
    usage: 'avatar <@user>',
    description: "Shows users avatar"
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {
    const user = message.mentions.users.first() ? message.mentions.users.first() : args[0] ? args[0] : message.author

    if (user === args[0]) {
        try {
        let mm = await client.users.fetch(args[0]);
    
        const  e = await new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${mm.username}'s avatar!`)
        .setImage(mm.displayAvatarURL({dynamic: true}))    
        await message.channel.send(e)
        } catch  {
            message.reply(client.noMember)
        }
    } else {

    const embed = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${user.username}'s avatar!`)
    .setImage(user.displayAvatarURL({dynamic: true}))

    message.channel.send(embed);
};
}