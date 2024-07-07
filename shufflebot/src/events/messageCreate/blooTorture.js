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
        const zest = await blootorture.findOne(({}))
        try {
            for(const blooword of zest.words) {
                if (message.content.includes(blooword.toString())) {
                    const banimage = new AttachmentBuilder('https://media.discordapp.net/attachments/1257792531156959303/1259291301489147945/banned.png?ex=668bceaa&is=668a7d2a&hm=693fc251547692b3782f2dc68ed58b32ee929f7ff1391358e2e4f7996f1c9a0e&=&format=webp&quality=lossless')
                    message.reply(
                        {content: 'NO'},
                        {files: [banimage]}
                    )
                    message.delete()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}