module.exports.config = {
    name: "ping",
    cooldown: '1',
    group: "info",
    example: '!Ping',
    usage: 'ping <member> <reason>',
    description: "Ping command"
}

module.exports.run = async(client, message, args) => {
    let msg = await message.channel.send('Pinging..');

    msg.edit(`Pong! Ping is \`${msg.createdTimestamp - message.createdTimestamp}\`ms | Discord API latency is \`${client.ws.ping}\`ms`)
}