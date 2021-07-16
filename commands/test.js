module.exports.config  = {
    name: "test"
}

module.exports.run = async(client, message, args ) =>{
    message.channel.send(client.muteRoleInvalid)
}