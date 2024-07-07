const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment} = require("discord.js");
const bloosinferno = require('../../models/bloosinferno')
module.exports = {
    name:'removeblooword',
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
            var query = ({})
            const word = interaction.options.get('word').value
            const oldMap = await bloosinferno.findOne(query)
            const oldWord = oldMap.words.includes(interaction.options.get('word').value)
            const hasRole = interaction.member.roles.cache.some(r => r.name === 'bailiff')
            const options = { upsert : false }
            if (oldWord && hasRole) {
                interaction.editReply('⠀')
                var votes = oldMap.words.splice(oldMap.words.indexOf(oldWord), 1)
                oldMap.save(votes)
            } else {
                interaction.editReply(
                    'That word doesnt exist or you cant do that'
                )
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}