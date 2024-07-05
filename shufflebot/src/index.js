require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

var http = require('http'); http.createServer(function (req, res) { res.write("I'm alive"); res.end(); }).listen(8080); 

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});




(async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {})
        console.log('Connected to DB')
    
        eventHandler(client);
        
        client.login(
            process.env.TOKEN
        );
    } catch (error) {
        console.log(error)
    }
})()

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {return;}
        await interaction.deferReply({ephemeral:true})

        const hasRole = interaction.member.roles.cache.has(role.id)

        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`You are no longer a ${role}er. :p`)
            return;
        }

        await interaction.member.roles.add(role);
        await interaction.editReply(`You are now a ${role}er. c:`)
    }
})

let status = [
    {
        name: 'idk, surfing',
        type: ActivityType.Watching
    },
    {
        name: 'idk, wurfing',
        type: ActivityType.Watching
    },
    {
        name: 'skial players voting rainbow again',
        type: ActivityType.Watching
    },
]
client.on('ready', (c) => {
    console.log(`${client.user.tag} is online.`)
    setInterval(() => {
        let random = Math.floor(Math.random()*status.length)
        client.user.setActivity(status[random])
    }, 10000)
})












