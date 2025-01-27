const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment, SlashCommandBuilder} = require("discord.js");
const gallery = require('../../models/gallery')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addgalleryentry')
        .setDescription('Adds a gallery entry to a board')
        .addStringOption(option => 
            option.setName('map')
                .setDescription('The board to post the entry to')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('pic')
                .setDescription('The URL of the picture')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('caption')
                .setDescription('The caption of the gallery entry')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('nsfw')
                .setDescription('Any entry into this field will mark it as NSFW')
                .setRequired(false)
        ),



        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()
        
        try {
            const caption = interaction.options.get('caption').value
            const pic = interaction.options.get('pic').value
            if (!pic.includes('http')) {
                interaction.editReply('Not an image URL')
                return
            }
            const map = interaction.options.get('map').value
            if (interaction.options.get('nsfw')) {
                var nsfw = interaction.options.get('nsfw').value
            } else {
                var nsfw = 0
            }
            const submitter = interaction.user.tag
            const timestamp = Date.now()
            var query = {map: map}
            var oldMap = await gallery.findOne(query)
            if (!oldMap) {
                interaction.editReply(
                    'There is no board for that map. Create one with /addboard <map>'
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