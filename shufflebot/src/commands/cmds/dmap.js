const {Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const dmaps = require('../../models/dmaps')
const maps = require('../../models/maps')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmap')
        .setDescription('Adds a D tier to a map')
        .addStringOption(option => 
            option.setName('map')
                .setDescription('The map to add the D tier to')
                .setRequired(true)
        )
        .addNumberOption(option => 
            option.setName('dtier')
                .setDescription('The d tier to set')
                .setRequired(true)
        ),
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    
    async execute(interaction) {
        await interaction.deferReply()
        const query1 = {name: interaction.options.get('map').value}
        const query = await maps.findOne(query1)
        const hasRole = interaction.member.roles.cache.some(r => r.name === 'Vice President')
        const query2 = {map: interaction.options.get('map').value, dtier: interaction.options.get('dtier').value}
        const oldRecord = await dmaps.findOne(query2)
        if (query && hasRole) {
            const newRecord = new dmaps({
                map: interaction.options.get('map').value,
                dtier: interaction.options.get('dtier').value
            })

            if (oldRecord) {
                const deletedRecord = await dmaps.deleteOne({map: interaction.options.get('map').value})
                newRecord.save()
                interaction.editReply(`New (replaced) tier for ${interaction.options.get('map').value}`)
            }
            newRecord.save()
            interaction.editReply(`New D tier for ${interaction.options.get('map').value} has been set`)
        } else if (!query) {
            interaction.editReply('The map that you are trying to submit a D tier to does not exist. Please create the map, or check for typos.')
        } else {
            interaction.editReply(`You aren't allowed to do that`)
        }
    }
}