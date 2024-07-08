module.exports = async (client, guildId) => {
    let applicationCommands;

    if (guildId) {
        const guild = await client.guilds.fetch(client.guild.id)
        applicationCommands = guild.commands
        console.log('a')
        console.log(guild)

    } else {
        console.log('b')
        applicationCommands = await client.application.commands
    }
    
    await applicationCommands.fetch()

    return applicationCommands
}