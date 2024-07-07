const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const maps = require('../../models/bloosinferno')
module.exports = {
    name:'addblooword',
    description:'heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic',
    options:[
        {
            name:'word',
            description:'word of bloo',
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

        
        try {
            const query = {
                word: interaction.options.get('word').value
            }
            const oldMap = await maps.findOne({query})
            console.log(oldMap)
            const hasRole = interaction.member.roles.cache.has('1257704302428815521')
            if (!oldMap && hasRole) {
                var file = null
                interaction.editReply('⠀')

            } else {
                interaction.editReply('That word already exists.')
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}