const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment, SlashCommandBuilder} = require("discord.js");
const bloosinferno = require('../../models/bloosinferno')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addblooword')
        .setDescription('heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic heretic')
        .addStringOption(option => 
            option.setName('word')
                .setDescription('bloo word')
                .setRequired(true)
        ),

        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(client, interaction) {
        await interaction.deferReply()

        
        try {
            var query = ({})
            const word = interaction.options.get('word').value
            const oldMap = await bloosinferno.findOne(query)
            const oldWord = oldMap.words.includes(interaction.options.get('word').value)
            const hasRole = interaction.member.roles.cache.some(r => r.name === 'bailiff')
            const options = { upsert : false }
            if (!oldWord && hasRole) {
                interaction.editReply('⠀')
                var votes = oldMap.words.push(word)
                oldMap.save(votes)
            } else {
                interaction.editReply(
                    'That word does already exist or you cant do that'
                )
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}