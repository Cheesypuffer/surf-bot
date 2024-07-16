const {Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const record = require('../../models/times')
const mapzz = require('../../models/maps')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('removetime')
        .setDescription('Remove a time on a map from the database.')
        .addMentionableOption(option => 
            option.setName('user')
                .setDescription('the user that achieved the time')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('map')
                .setDescription('the map that achieved the time')
                .setRequired(true)
        ),
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    
    async execute(interaction) {
        await interaction.deferReply()
        const query = await record.find({userId: interaction.options.get('user').value}, {map: interaction.options.get('map').value})
        const hasRole = interaction.member.roles.cache.has('1257704302428815521')
        if (query && hasRole) {
            const result = await record.deleteMany({userId: interaction.options.get('user').value}, {map: interaction.options.get('map').value})
            const recordchannel = client.channels.cache.get('1256343173748359379')
            interaction.editReply('Record deleted.')
        }
    }
}