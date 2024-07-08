module.exports = async (client, guildId) => {
    let applicationCommands;

    if (guildId) {
        const guild = await client.guilds.fetch(guildId)
        applicationCommands = guild.commands
        console.log('a')
        console.log(guildId)
    } else {
        console.log('b')
        applicationCommands = await client.application.commands
        console.log(applicationCommands)
    }
    
    await applicationCommands.fetch()

    return applicationCommands
}