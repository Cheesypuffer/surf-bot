const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment,SlashCommandBuilder} = require("discord.js");
const bloosinferno = require('../../models/bloosinferno')

const roles = [
    'Tier 0',
    'Tier 1',
    'Tier 2',
    'Tier 3',
    'Tier 4',
    'Tier 5',
    'Tier 6',
    'Tier 7',
    'Tier 8',
    'Tier 9',
    'Tier 10',
    'Tier 11',
    'Tier 12'
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('initializebot')
    .setDescription('create roles, channels, etc.'),

        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()

        
        try {
            //The Purifier
            for (const role of roles) {
                const oldRole = interaction.guild.roles.cache.find(r => r.name === role)
                if (!oldRole) {
                    console.log(role)
                    interaction.guild.roles.create({
                        data: {
                            name: role,
                            color: 'WHITE'
                        },
                        reason: 'Initializing the bot'
                    })
                }

            }

        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}

