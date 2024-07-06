const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Message} = require("discord.js");
const maps = require('../../models/maps')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

//Bloo89 Torture Device

module.exports = async (client, message) => {
    if (message.author.id === '693185613775503400') {
        //message.react('🥵')
        if (message.content.includes('friend')) {
            message.delete()
        }
    }
}