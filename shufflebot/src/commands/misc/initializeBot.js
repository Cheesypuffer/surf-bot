const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Attachment} = require("discord.js");
const bloosinferno = require('../../models/bloosinferno')
module.exports = {
    name:'initializebot',
    description:'creates roles, channels, etc',

        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        await interaction.deferReply()

        
        try {
            //The Purifier
            
        } catch (error) {
            console.log(error)
            interaction.editReply('Errored')
        }
    }
}