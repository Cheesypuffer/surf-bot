const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment} = require("discord.js");
const bloosinferno = require('../../models/bloosinferno')
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
            var query = ({})
            const word = interaction.options.get('word').value
            const oldMap = await bloosinferno.findOne(query)
            const oldWord = oldMap.words.includes(interaction.options.get('word').value)
            const hasRole = interaction.member.roles.cache.has('1259292280272060478')
            const options = { upsert : false }
            if (!oldWord && hasRole) {
                interaction.editReply('⠀')
                var votes = oldMap.words.push(word)
            } else {
                interaction.editReply(
                    'That word  already exists'
                )
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}