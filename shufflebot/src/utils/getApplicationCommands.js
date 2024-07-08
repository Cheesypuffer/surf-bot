module.exports = async (client, guildId) => {
    let applicationCommands;

    if (guildId) {
        const guild = await client.guilds.fetch(guildId)
        applicationCommands = guild.commands
        console.log('a')
        console.log(guildId)
        console.log(guildId.guildId)

    } else {
        console.log('b')
        applicationCommands = await client.application.commands
    }
    
    await applicationCommands.fetch()

    return applicationCommands
}