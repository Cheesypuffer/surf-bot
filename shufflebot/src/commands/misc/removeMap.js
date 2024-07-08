const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const maps = require('../../models/maps')
module.exports = {
    name:'removemap',
    description:':wave:',
    options:[
        {
            name:'name',
            description:'name of map',
            required:true,
            type:ApplicationCommandOptionType.String
        }
    ],

           /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    
    async execute(client, interaction) {
        try {
            await interaction.deferReply()
            const query = {
                name: interaction.options.get('name').value
            }
            const oldMap = await maps.findOne(query)
            const hasRole = interaction.member.roles.cache.some(r => r.name === 'map curator')
            if(oldMap && hasRole) {
                const result = await maps.deleteOne({name: interaction.options.get('name').value})
                if (result.deletedCount === 1) {
                    interaction.editReply(`Successfully deleted ${interaction.options.get('name').value} from the map selection.`)
                } else {
                    interaction.editReply(`Do not.`)
                }
            } else {
                interaction.editReply('You are trying to delete a map that does not exist.')
            }
        } catch (error) {
            console.log(error)
        }
    }
}