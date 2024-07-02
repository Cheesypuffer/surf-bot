const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const maps = require('../../models/maps')

module.exports = {
    name:'testcommmand',
    description:'test',
    deleted: true,
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client,interaction) => {
        var that = await maps.find({})
        console.log(that)
        interaction.reply('a')
    }
}