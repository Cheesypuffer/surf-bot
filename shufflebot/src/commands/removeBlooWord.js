const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment, SlashCommandBuilder} = require("discord.js");
const bloosinferno = require('../models/bloosinferno')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeblooword')
        .setDescription('heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic')
        .addStringOption(option => 
            option.setName('word')
                .setDescription('word of bloo')
                .setRequired(true)
        ),

        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
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