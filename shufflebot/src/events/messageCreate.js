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
        console.log('sex')
        const message = interaction
        if (interaction.member.roles.cache.some(r => r.name === 'Slimy Weasel')) {
            //message.react('🥵')
            var zest = await blootorture.findOne(({}))
            try {
                for(const blooword of zest.words) {
                    if (message.content.includes(blooword.toString())) {
                        const banimage = new AttachmentBuilder('https://media.discordapp.net/attachments/1257792531156959303/1259291301489147945/banned.png?ex=668bceaa&is=668a7d2a&hm=693fc251547692b3782f2dc68ed58b32ee929f7ff1391358e2e4f7996f1c9a0e&=&format=webp&quality=lossless')
                        message.channel.send(
                            {content: gifs[Math.floor(Math.random()*5)]}
                        )
                        message.delete()
                        return
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }    
}
const gifs = [
    'https://media.discordapp.net/attachments/1256006687366713427/1259613083379302421/3dgifmaker25846.gif?ex=668c5199&is=668b0019&hm=2e89fb7da743499e13aabdd3f1f3070ec2151728375cfd34dc33a7a00571fbc1&=',
    'https://media.discordapp.net/attachments/1256006687366713427/1259613082502696960/3dgifmaker47700.gif?ex=668c5199&is=668b0019&hm=9bbcf168140bf9d8a719ddd5adf2d22b89747af168627e89c7ee078f3bfd8ed8&=',
    'https://media.discordapp.net/attachments/1256006687366713427/1259613082901287073/3dgifmaker36050.gif?ex=668c5199&is=668b0019&hm=6a68756f08ddb9fab82e2d66a41c9ee5a0c6aca849d6e6c735f72c139c2cc0f9&=',
    'https://media.discordapp.net/attachments/1256006687366713427/1259613083752464479/3dgifmaker19950.gif?ex=668c5199&is=668b0019&hm=f4eeec03fa587212ca5e602755bdf0daa2cfc9da945e94736009a34ac65dae5b&=',
    'https://media.discordapp.net/attachments/1256006687366713427/1259613084050526238/3dgifmaker16907.gif?ex=668c5199&is=668b0019&hm=4596b4aca1179874f4694b5a0fd7c0782f89782b74508cba5a6a0a2892003933&='
]