const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { inspect } = require("util");

module.exports.config = {
    name: "eval",
    group: "owners",
    ownerOnly: true,
    guarded: true,
    usage: '.eval <code>',
    example: '.eval console.log("Hello world")'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send(client.main);
    let code = args.join(' ')
    code = code.replace(/[""]/g, '"').replace(/['']/g, "'")

    let evaled;
    try {
        const start = process.hrtime()
        evaled = eval(code);
        if (evaled instanceof Promise) {
            evaled = await eval
        }
        const stop = process.hrtime(start);
        let response = [
            `**OutPut: \`\`\`js\n${(inspect(evaled, {depth: 0}))}\n\`\`\``
        //, `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``
        , `**Time taken: \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
    ]
    const res = response.join('\n')
    if (res.length < 2000) {
        await message.channel.send(res)
    } else {
        const output = new MessageAttachment(Buffer.from(res), 'output.txt');
        await message.channel.send(output);
        
    }
    } catch (error) {
        console.log(error)
        message.reply('Err')
    }
   /**
    *  function clean(text) {
        if (typeof text === 'string') {
            text = text
            .replace(/` /g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g, `@${String.fromCharCode(8203)}`)
            .replace(new RegExp(client.token, 'gi'), '****')
        }
        return text
    }
    */
}