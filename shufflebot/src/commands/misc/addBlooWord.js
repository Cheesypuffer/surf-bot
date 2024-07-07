const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment} = require("discord.js");
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
            const banimage = new AttachmentBuilder('https://media.discordapp.net/attachments/1257792531156959303/1259291301489147945/banned.png?ex=668bceaa&is=668a7d2a&hm=693fc251547692b3782f2dc68ed58b32ee929f7ff1391358e2e4f7996f1c9a0e&=&format=webp&quality=lossless')
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
                interaction.editReply(
                    {content: 'NO'},
                    {files: [banimage]}
                )
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}