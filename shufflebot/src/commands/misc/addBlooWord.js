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
            const query = ({})
            const word = interaction.options.get('word').value
            const oldMap = await maps.findOne(query)
            const oldWord = await oldMap.words.includes()
            const hasRole = interaction.member.roles.cache.has('1259292280272060478')
            const options = { upsert : false }
            if (!oldWord && hasRole) {
                interaction.editReply('⠀')
                var votes = oldMap.words.push(word)
                const result = await maps.updateOne(query, {
                    $set: {
                        words: votes
                    }
                }, options)

            } else {
                interaction.editReply('That word already exists.')
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}