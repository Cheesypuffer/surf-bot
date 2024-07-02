require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

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
        await interaction.deferReply({ephemeral:true})
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {
            interaction.reply({content: 'what'})
            return;
        }

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












