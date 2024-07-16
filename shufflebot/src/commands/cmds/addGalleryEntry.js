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
        )
        .addStringOption(option => 
            option.setName('nsfw')
                .setDescription('is the image nsfw, any entry into this field will mark it as such')
                .setRequired(false)
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
            const nsfw = interaction.options.get('nsfw').value
            const submitter = interaction.user.tag
            const timestamp = Date.now()
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
            if (!oldWord && oldMap) {
                interaction.editReply('⠀')
                var votes = oldMap.pics.push({ caption: caption, pic: pic,timestamp: timestamp, nsfw: nsfw, submitter: submitter})
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