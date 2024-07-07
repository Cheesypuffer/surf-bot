const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Message, ThreadOnlyChannel} = require("discord.js");
const maps = require('../../models/maps')
const blootorture = require('../../models/bloosinferno')
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

//Bloo89 Torture Device

const banimage = new AttachmentBuilder()
module.exports = async (client, message) => {
    if (message.author.id === '1059312531308556399') {
        //message.react('🥵')
        const zest = await blootorture.findOne(({}))
        try {
            for(const blooword of zest.words) {
                if (message.content.includes(blooword)) {
                    message.delete()

                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}