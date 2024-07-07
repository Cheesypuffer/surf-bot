const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Message, ThreadOnlyChannel} = require("discord.js");
const maps = require('../../models/maps')
const blootorture = require('../../models/bloosinferno')
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

//Bloo89 Torture Device

module.exports = async (client, message) => {
    if (message.author.id === '1059312531308556399') {
        //message.react('🥵')
        try {
            for(const blooword of blootorture.find(({}))) {
                if (message.content.includes(blooword)) {
                    message.delete()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}