const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const { default: mongoose } = require("mongoose");
const mapz = require('../../models/maps');
const { options } = require("./removeTime");
module.exports = {
    name:'mapinfo',
    description:'get info for a map',
    options: [
        {
            name:'map',
            description:'the map to collect info from',
            required:true,
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply()
        var mapToVoteRaw = await mapz.findOne({name: interaction.options.get('map').value})
        var allMaps = await mapz.find({})
        var readablemaps = []
        var usuablemaps = []
        var map = mapToVoteRaw
        if (!mapToVoteRaw) {
            for(const mapToVote1 of allMaps) {
                if((mapToVote1.name).includes(interaction.options.get('map').value)) {
                    readablemaps.push(mapToVote1.name)
                    usuablemaps.push(mapToVote1)
                }
            }
            if(readablemaps.length === 1) {
                map = usuablemaps[0]
            } else if (readablemaps.length === 0) {
                interaction.editReply(`Map not found.`)
                return
            } else {
                var readableMapsString = readablemaps.toString()
                readableMapsString = readableMapsString.replace(/ *, */g, '\n');
                interaction.editReply(`Map not found. Did you mean: \n${readableMapsString}`)
                return
            }
        }
        const role = interaction.guild.roles.cache.some(r => r.name ===  roles[map.tier])
        const file = new AttachmentBuilder(map.icon)
        const file2 = new AttachmentBuilder(map.thumbnail)
        const embed = new EmbedBuilder()
            .setTitle(`${map.name}`)
            .setDescription(`Tier ${map.tier} \n [Servers hosting this map](https://teamwork.tf/community/quickplay/map/${map.name}?gamemode=)`)
            if (role) {
                embed.setColor(role.hexColor)
                embed.addFields(
                    { name: 'Ping:', value: `<@&${roles[map.tier]}>` },
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
            embed.setAuthor({name:`${interaction.user.tag} wants to get map info`, iconURL:`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`})
        interaction.channel.send({embeds: [embed]}, {files: [file, file2]});
        interaction.editReply('⠀')
    }
}

const roles = [
    'Tier 0',
    'Tier 1',
    'Tier 2',
    'Tier 3',
    'Tier 4',
    'Tier 5',
    'Tier 6',
    'Tier 7',
    'Tier 8',
    'Tier 9',
    'Tier 10',
    'Tier 11',
    'Tier 12'
];