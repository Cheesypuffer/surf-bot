const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, SlashCommandBuilder} = require("discord.js");
const galleries = require('../models/gallery')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('addboard')
        .setDescription('Adds a gallery board')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('name of map')
                .setRequired(true)
        ),

        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()

        
        try {
            const query = {
                map: interaction.options.get('name').value
            }
            var oldMap = await galleries.findOne(query)
            if (!oldMap) {
                var file = null
                interaction.channel.send(`Board ${interaction.options.get('name').value} has been created.`);
                interaction.editReply('⠀')
                
                var map = new galleries ({
                    name: `${interaction.options.get('name').value}`,
                })
                await map.save()
                
            } else {
                interaction.editReply(`Board ${map.name}| has already been created.`)
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Invalid URL')
        }
    }
}

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