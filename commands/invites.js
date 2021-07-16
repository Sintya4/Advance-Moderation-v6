const { Client, Message } = require("discord.js")
const {MessageEmbed} = require('discord.js')


module.exports.config = {
    name: 'invites',
    group: 'management',
    botperms: ['EMBED_LINKS'],
    description: "Get all server invites",
    usage: '.invites',
    example: '.invites'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) => {
const { guild } = message

guild.fetchInvites().then((invites) => {
    const inviteCount = {}

    invites.forEach((invite) => {
        const { uses, inviter } = invite
        const { username, discriminator } = inviter

        const name = `${username}#${discriminator}`

        inviteCount[name] = (inviteCount[name] || 0) + uses
    })

    let replText = 'Invites:'

     

    for (const invite in inviteCount) {
        const count = inviteCount[invite]
        replText += `\n${invite} has  invited ${count} member(s)`
    }
    try {
      let e = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(replText)
      .setColor(client.color)
    message.reply(e);
    } catch (e){
    
        message.channel.send("I cannot list all the invites as it is more than 2000 characters to write out.")
    }

    })

}