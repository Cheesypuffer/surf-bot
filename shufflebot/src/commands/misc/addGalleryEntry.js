const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment, SlashCommandBuilder} = require("discord.js");
const gallery = require('../../models/gallery')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addgalleryentry')
        .setDescription('<3')
        .addStringOption(option => 
            option.setName('map')
                .setDescription('Map attributed to the pic')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('pic')
                .setDescription('picture link')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('caption')
                .setDescription('caption')
                .setRequired(false)
        ),


        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()

        interaction.editReply('Sorry, but this is NOT implemented right now. I will probably work on it tommorow')

        return
        
        try {
            var query = ({})
            const caption = interaction.options.get('caption').value
            const pic = interaction.options.get('pic').value
            const map = interaction.options.get('map').value
            const oldMap = await gallery.findOne(query)
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