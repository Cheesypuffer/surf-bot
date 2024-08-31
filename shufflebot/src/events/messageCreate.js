const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, Message, ThreadOnlyChannel, Events} = require("discord.js");
const maps = require('../models/maps')
const blootorture = require('../models/bloosinferno')
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

//Bloo89 Torture Device

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {
        const message = interaction
        try {
        if (interaction.member.roles.cache.some(r => r.name === 'Slimy Weasel')) {
            //message.react('🥵')
            var zest = await blootorture.findOne(({}))
                for(const blooword of zest.words) {
                    if (message.content.toUpperCase().includes(blooword.toString())) {
                        const banimage = new AttachmentBuilder('https://media.discordapp.net/attachments/1257792531156959303/1259291301489147945/banned.png?ex=668bceaa&is=668a7d2a&hm=693fc251547692b3782f2dc68ed58b32ee929f7ff1391358e2e4f7996f1c9a0e&=&format=webp&quality=lossless')
                        ///message.channel.send(
                            ///{content: gifs[Math.floor(Math.random()*5)]}
                        ///)
                        message.delete()
                        return
                    }
                }
            }   
            } catch (error) {
                console.log(error)
            }
        }
    }
const gifs = [
    'https://media.tenor.com/9blMyS3kX0UAAAAi/illegal.gif',
    'https://media.tenor.com/U5dYvSpkw8AAAAAi/illegal.gif',
    'https://media.tenor.com/LXSq0UdUYawAAAAi/illegal.gif',
    'https://media.tenor.com/Hul1wMbG7usAAAAi/illegal.gif',
    'https://media.tenor.com/LXSq0UdUYawAAAAi/illegal.gif'
]