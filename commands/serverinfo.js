module.exports.config = {
    name: "serverinfo",
    description: "Shows Information about the server",
    group: 'info',
    usage: '.serverinfo',
    example: '.serverinfo'
,   botperms: ['EMBED_LINKS']
}

module.exports.run = async(client, message, args) => {
    
    const {MessageEmbed} = require('discord.js')

    const owner = message.guild.ownerID
    const cato =        message.guild.channels.cache.filter(ch => ch.type === 'category').size
let embed = new MessageEmbed()
.setColor(client.color)
.setTitle(`${message.guild.name}`)
.addField("**Owner:**", `<@${owner}>` , true)
.addField("Region", message.guild.region, true)
.addField("Text Channels", message.guild.channels.cache.size, true)
.addField("Members", message.guild.memberCount, true)
.addField("**Role list**", message.guild.roles.cache.size, true)//a70f3e9169546b2c67d301aaeef38.gif
.addField("**Catogory size**", cato, true)
.setThumbnail(message.guild.iconURL())
.setFooter(`${message.author.username}`, message.author.displayAvatarURL())
message.channel.send(embed)
}