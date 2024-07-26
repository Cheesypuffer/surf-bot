const {devs, testServer} = require ('../../config.json');
const getLocalCommands = require('../utils/getApplicationCommands')

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) {
        const message = interaction.message
        console.log(message)
        console.log(interaction.message.content)
        console.log(interaction.content)
        if (interaction.member.roles.cache.some(r => r.name === 'Slimy Weasel')) {
            //message.react('🥵')
            var zest = await blootorture.findOne(({}))
            try {
                for(const blooword of zest.words) {
                    if (message.content.includes(blooword.toString())) {
                        const banimage = new AttachmentBuilder('https://media.discordapp.net/attachments/1257792531156959303/1259291301489147945/banned.png?ex=668bceaa&is=668a7d2a&hm=693fc251547692b3782f2dc68ed58b32ee929f7ff1391358e2e4f7996f1c9a0e&=&format=webp&quality=lossless')
                        interaction.reply(
                            {content: gifs[Math.floor(Math.random()*5)]},
                            {ephemeral : true}
                        )
                        interaction.message.delete()
                        return
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        return
    }
    
    const localCommands = getLocalCommands()

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content : `dev only`,
                    ephemeral : true
                });
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content : `test only`,
                    ephemeral : true
                });
                return;
            }
        }
        
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'insufficient permissions',
                        ephemeral:true
                    })
                    return;


                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content:'The bot cant do that',
                        ephemeral:true
                    })
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction)
    } catch (error) {
        console.log(error)
    }
}