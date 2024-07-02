require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name : 'randommap',
        description: 'displays a random surf map',
        options : [
            {
                name : 'tier',
                description : 'what tier of surf maps are included in the map selection',
                type : ApplicationCommandOptionType.Integer,
                required : true
            }
        ]
    }
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registering commands')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body : commands}
        )
        console.log('registered')
    } catch (error) {
        console.log(`${error}`)
    }
})();