const { MessageEmbed, Message } = require("discord.js")

module.exports = (client) => {

    // Toggling command system

    client.alreadyEnabled = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} That command is already enabled`)

    client.alreadyDisabled = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} That command is already disabled`)

     client.guarded = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} You cannot enable/disable that command`);

    // Unkwon command

    client.aintCommandSherlock = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Unknown command`)

    // Incorrect member given

    client.noMember = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Unknown member`)

    // Incorrect user given

    client.noUser = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Unknown user`)

    // Role checking 

    client.roleHigher = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} That user is a higher role than me`)

    // Snipe command

    client.noSnipes = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} There\'s no messages to snipe`)

    // Ban and kick command

    client.higherRole = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} That member is a higher role than you`);

    // Anti bot 

    client.incorrectOP = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} There are Only \`ban, kick\` bot punishments `)

    client.incorrectUserPunish = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} There are only \`ban, kick, remove_roles\` user punishments`)

    // Over all moderation section

    client.noUserDB = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} User not found in database`)

    client.userstaff = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} That member is a mod/admin! I can\'t do that`)

    client.userNoWarns = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} _The user has no warnings_`)


    client.cantDelOwnWarn = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} _You cannot delete your own warning_`)


    client.amountNum = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Amount must be a number`)

    // Guild checks

    client.guildOnlyCmd = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} This is a guild only command`)

    // Mute role checks

    client.noMuteRole = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Failed to find mute role`);

    client.muteRoleInvalid = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Mute role found in database but not server`)

    client.roleHigherThanMe = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} The mute role is a higher role than me`);

    // Channel checking 

    client.noChannel = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Unknown Channel `)

    // Simple checking

    client.disabled = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} That command is disabled`)
     
    client.noperms = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail}Member missing required permissions`)

    // Setup command 

    client.setupStart = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.success} _Starting setup_`)

    client.setlogsChannel = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.success} All modlogs have been set to this channel`)

    client.completeSetup = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.success} _Completed setup!_`)


}
