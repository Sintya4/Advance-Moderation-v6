const fs = require('fs')

module.exports = (client) => {
    fs.readdir('./commands/', (err, files) => {
        if (err) console.log(err);
    
        let jsFile = files.filter(f => f.split('.').pop() === 'js');
        if (jsFile.length <= 0) {
            return console.log('No commands')
        }
    
        jsFile.forEach((file, i) => {
            var pullCmd = require(`../../commands/${file}`);
            client.commands.set(pullCmd.config.name, pullCmd);

            console.log('Successfully loaded ' + pullCmd.config.name + ' command ', '✅')

            if (!pullCmd.config.name) {
                console.log(`❌  -> missing a help.name, or help.name is not a string.`)
            }
            if (!pullCmd.config.group) {
                console.log('❌ -> Couldn\'t find any group in ' + pullCmd.config.name)
                return;
        
            } else {
                if (!client.groups.includes(pullCmd.config.group)) {
                    return console.log('❌ -> Unknown group ' + `${pullCmd.config.group} in ` + pullCmd.config.name)
                }
            }
            try {
            pullCmd.config.aliases.forEach(alias => {
                client.aliases.set(alias, pullCmd.config.name);
            });
        } catch {
            
        }
    
        });
    });
}