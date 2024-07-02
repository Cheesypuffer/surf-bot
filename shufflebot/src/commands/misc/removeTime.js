const {Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const record = require('../../models/times')
const mapzz = require('../../models/maps')
module.exports = {
    name:'removetime',
    description:'Remove a time on a map from the database.',
    options: [
        {
            name:'map',
            description:'map they got the time on',
            required:true,
            type:ApplicationCommandOptionType.String
        },
        {
            name:'time',
            description:'the time that it took them to beat the surf, in seconds',
            required:true,
            type:ApplicationCommandOptionType.Number
        },
        {
            name:'proof',
            description:'a video of them achieving their time.',
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
        const query = mapzz.findOne({map: interaction.options.get('map').value, time: interaction.options.get('time').value, proof: interaction.options.get('proof').value})
        const hasRole = interaction.member.roles.cache.has('1257704302428815521')
        if (query && hasRole) {
            const result = await maps.deleteOne({map: interaction.options.get('map').value, time: interaction.options.get('time').value, proof: interaction.options.get('proof').value})

            const { default: prettyMs} = await import('pretty-ms')
            const recordchannel = client.channels.cache.get('1256343173748359379')
            interaction.editReply('Record deleted.')
        }
    }
}