const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, SlashCommandBuilder} = require("discord.js");
const maps = require('../models/maps')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('submitmap')
        .setDescription('Submits a map to be used in the map selection.')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('name of map')
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('tier')
                .setDescription('tier of map')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('link')
                .setDescription('link of map')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('icon')
                .setDescription('icon of map')
                .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('thumbnail')
                .setDescription('thumbnail of map')
                .setRequired(false)
        ),

        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    async execute(interaction) {
        await interaction.deferReply()

        
        try {
            const query = {
                name: interaction.options.get('name').value
            }
            var oldMap = await maps.findOne(query)
            const hasRole = interaction.member.roles.cache.some(r => r.name === 'map curator')
            if (!oldMap && hasRole) {
                var file = null
                var map = null
                if (interaction.options.get('icon')) {
                    map = new maps ({
                        name: `${interaction.options.get('name').value}`,
                        tier: `${interaction.options.get('tier').value}`,
                        link: `${interaction.options.get('link').value}`,
                        icon: `${interaction.options.get('icon').value}`,
                        thumbnail: `${interaction.options.get('thumbnail').value}`
                    })
                    file = new AttachmentBuilder(map.icon)
                } else {
                    map = new maps ({
                        name: `${interaction.options.get('name').value}`,
                        tier: `${interaction.options.get('tier').value}`,
                        link: `${interaction.options.get('link').value}`,
                        icon: 'https://media.discordapp.net/attachments/1256006687366713427/1257000435462570077/Untitled.jpg?ex=6682d061&is=66817ee1&hm=4a6f24c89a27314977d3e6dfa0f0112824a34ae4cd9ce7c14cd155a9c2eb5f48&=&format=webp',
                        thumbnail: 'https://cdn.discordapp.com/attachments/1256006687366713427/1257771232955207820/missingno.png?ex=66859e3e&is=66844cbe&hm=53e5fc4c5178852dffa13a29e55f1617bb0166ebcdbb474accc6a61d6e6694a8&'

                    })
                    file = new AttachmentBuilder('https://media.discordapp.net/attachments/1256006687366713427/1257000435462570077/Untitled.jpg?ex=6682d061&is=66817ee1&hm=4a6f24c89a27314977d3e6dfa0f0112824a34ae4cd9ce7c14cd155a9c2eb5f48&=&format=webp')
                }
               
                const role = interaction.guild.roles.cache.find(r => r.name === `Tier ${map.tier}`)
                const embed = new EmbedBuilder()
                    .setTitle(`${map.name}`)
                    .setDescription(`Tier ${map.tier}`)
                    .setColor(0x0099FF)
                    embed.setURL(map.link)
                    embed.setTimestamp()
                    embed.setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
                    embed.addFields(
                        { name: 'Ping:', value: `<@&${roles[map.tier]}>` },
                )
                embed.setAuthor({name:`${interaction.user.tag} has submitted a map for the map selection:`, iconURL:`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`})
            interaction.channel.send({embeds: [embed]}, {files: [file]});
            interaction.editReply('⠀')
            await map.save()
            } else {
                interaction.editReply('That map already exists!')
            }
        } catch (error) {
            console.log(error)
            interaction.editReply('Invalid URL')
        }
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