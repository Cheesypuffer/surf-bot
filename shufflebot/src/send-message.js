require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const beginnerroles = [
    {
        id: '1256006955261235282',
        label: 'Tier 1'
    },
    {
        id: '1256007585157484606',
        label: 'Tier 2'
    },
    {
        id: '1256007785423044789',
        label: 'Tier 3'
    },
    {
        id: '1256007829769293854',
        label: 'Tier 4'
    },
    {
        id: '1256007936577241198',
        label: 'Tier 5'
    }
]
const intermediateroles = [
    {
        id: '1256008022216675480',
        label: 'Tier 6'
    },
    {
        id: '1256008084887703552',
        label: 'Tier 7'
    },
    {
        id: '1256008138235318373',
        label: 'Tier 8'
    },
    {
        id: '1256008173148442684',
        label: 'Tier 9'
    },
    {
        id: '1256008211824377997',
        label: 'Tier 10'
    }
]

const proroles = [
    {
        id: '1256008250252595251',
        label: 'Tier 11'
    },
    {
        id: '1256008299556376627',
        label: 'Tier 12'
    },
]

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1256026413467832552');
        if (!channel) return;

        const row1 = new ActionRowBuilder();
        
        beginnerroles.forEach((role) => {
            row1.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary));
        });

        const row2 = new ActionRowBuilder();
        
        intermediateroles.forEach((role) => {
            row2.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Secondary));
        });

        const row3 = new ActionRowBuilder();
        
        proroles.forEach((role) => {
            row3.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Danger));
        });

        await channel.send({
            content: 'Select tiers',
            components: [row1, row2, row3]
        })
        process.exit()
    } catch (error) {
        console.log(error)
    }
});




client.login(
    process.env.TOKEN
);