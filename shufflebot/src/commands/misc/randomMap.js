const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const { default: mongoose } = require("mongoose");
const mapz = require('../../models/maps')
module.exports = {
    name: 'randommap',
    description: 'Selects a random map from the map selection',
    devOnly: false,
    //testOnly: boolean
    options: [
        {
            name: 'tier',
            description:'tier of maps included',
            required:true,
            type:ApplicationCommandOptionType.Integer
        }
    ],

     /**
      * 
      * @param {Client} client 
      * @param {Interaction} interaction 
      * @returns 
      */
    callback: async (client, interaction) => {
        try {
            var maps = await mapz.find({})
            const tier = interaction.options.get('tier').value
            var maptier = 0
            var map = 'null'
            var nub = 0
            await interaction.deferReply()
            while (true && nub <= 1000) {
                map = maps[
                    Math.floor(
                        Math.random() * (maps.length)
                    )];
                    nub += 1
                    if (nub>=1000) {
                        interaction.editReply(`There isn't a map for that tier`)
                        return
                    }
                if (map.tier === tier) {
                    break
                }
            }
            const role = interaction.guild.roles.cache.get(`${roles[map.tier-1]}`)
            const file = new AttachmentBuilder(map.icon)
            const file2 = new AttachmentBuilder(map.thumbnail)
            const embed = new EmbedBuilder()
                .setTitle(`${map.name}`)
                .setDescription(`Tier ${map.tier}`)
                if (role) {
                    embed.setColor(role.hexColor)
                    embed.addFields(
                        { name: 'Ping:', value: `<@&${roles[map.tier-1]}>` },
                        { name: `Upvotes: ${map.upvotes.length}`, value: `Downvotes: ${map.downvotes.length}`}
                    )
                } else {
                    embed.setColor('Blurple')
                    embed.addFields(
                        { name: `Upvotes: ${map.upvotes.length}`, value: `Downvotes: ${map.downvotes.length}`}
                    )
                }
                if (map.icon) {
                    embed.setImage(map.icon)
                } else {
                    embed.setImage('https://media.discordapp.net/attachments/1256006687366713427/1257000435462570077/Untitled.jpg?ex=6682d061&is=66817ee1&hm=4a6f24c89a27314977d3e6dfa0f0112824a34ae4cd9ce7c14cd155a9c2eb5f48&=&format=webp')
                }
                embed.setThumbnail(map.thumbnail)
                embed.setURL(map.link)
                embed.setTimestamp()
                ///embed.setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
                embed.setAuthor({name:`${interaction.user.tag}'s roll is . . .`, iconURL:`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`})
            interaction.channel.send({embeds: [embed]}, {files: [file, file2]});
            interaction.editReply('⠀')
        } catch (error) {
            console.log(error)
            interaction.reply('Uh oh, tell an admin.')
        }
    }
}



const roles = [
    '1256006955261235282',
    '1256007585157484606',
    '1256007785423044789',
    '1256007829769293854'
]