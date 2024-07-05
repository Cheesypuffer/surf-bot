const {Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const record = require('../../models/times')
const mapzz = require('../../models/maps')
module.exports = {
    name:'removetime',
    description:'Remove a time on a map from the database.',
    options: [
        {
            name:'user',
            description:'the user that achieved the time',
            required:true,
            type:ApplicationCommandOptionType.Mentionable
        },
        {
            name:'map',
            description:'the map that achieved the time',
            required:true,
            type:ApplicationCommandOptionType.String
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    
    callback: async (client, interaction) => {
        await interaction.deferReply()
        const query = await record.find({userId: interaction.options.get('user').value}, {map: interaction.options.get('map').value})
        const hasRole = interaction.member.roles.cache.has('1257704302428815521')
        if (query && hasRole) {
            const result = await record.deleteMany({userId: interaction.options.get('user').value}, {map: interaction.options.get('map').value})
            const recordchannel = client.channels.cache.get('1256343173748359379')
            result.save()
            interaction.editReply('Record deleted.')
        }
    }
}