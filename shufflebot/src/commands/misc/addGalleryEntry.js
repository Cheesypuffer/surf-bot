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
                .setRequired(true)
        ),


        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()

        ///interaction.editReply('Sorry, but this is NOT implemented right now. I will probably work on it tommorow')
        
        try {
            const caption = interaction.options.get('caption').value
            const pic = interaction.options.get('pic').value
            const map = interaction.options.get('map').value
            var query = {map: map}
            var oldMap = await gallery.findOne(query)
            if (!oldMap) {
                interaction.editReply(
                    'There is no board for that map. Create one with /createboard <map>'
                )
                return;
            }
            const oldWord = oldMap.pics.includes(interaction.options.get('pic').value)
            //const hasRole = interaction.member.roles.cache.some(r => r.name === 'balliff')
            const options = { upsert : false }
            if (!oldWord && hasRole && oldMap) {
                interaction.editReply('⠀')
                var votes = oldMap.pics.push({caption, pic})
                oldMap.save(votes)
            } else {
                interaction.editReply(
                    'Nah.'
                )
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}