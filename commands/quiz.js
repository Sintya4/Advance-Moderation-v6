const { MessageEmbed, Intents } = require('discord.js');

module.exports.config = {
    name: "quiz",
    description: 'Fun community quiz',
    group: 'fun',
    usage: '.quiz',
    example: '.quiz',
    botperms: ['EMBED_LINKS']
}

module.exports.run = async(client, message, args) => {
    const quiz = require('../utils/structure/exports/json/quiz.json');
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    
    const mainEmbed = new MessageEmbed()
    .setColor(client.color)
    .setDescription(item.question)

    message.channel.send(mainEmbed).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                message.channel.send(`${collected.first().author} got the correct answer!`);
            })
            .catch(() => {
                message.channel.send('Looks like nobody got the answer this time.');
            });
    });
 }