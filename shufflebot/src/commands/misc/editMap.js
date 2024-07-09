const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const maps = require('../../models/maps')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('editmap')
        .setDescription('editor.')
        .addStringOption(option => 
            option.setName('map name')
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
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('thumbnail')
                .setDescription('thumbnail of map')
                .setRequired(true)
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
            const options = { upsert : false }
            const oldMap = await maps.findOne(query)
            const hasRole = interaction.member.roles.cache.some(r => r.name === 'map curator')
            if (oldMap && hasRole) {
                var file = null
                var map = null
                if (interaction.options.get('icon')) {
                    file = new AttachmentBuilder(map.icon)
                    const result = await maps.updateOne(query, {
                        $set: {
                            icon: interaction.options.get('icon').value
                        }
                    }, options)
                }

                if (interaction.options.get('tier')) {
                    const result = await maps.updateOne(query, {
                        $set: {
                            tier: interaction.options.get('tier').value
                        }
                    }, options)
                }

                if (interaction.options.get('link')) {
                    const result = await maps.updateOne(query, {
                        $set: {
                            link: interaction.options.get('link').value
                        }
                    }, options)
                }
                if (interaction.options.get('thumbnail')) {
                    const result = await maps.updateOne(query, {
                        $set: {
                            thumbnail: interaction.options.get('thumbnail').value
                        }
                    }, options)
                }
               
                const role = interaction.guild.roles.cache.find(r => r.name === `Tier ${map.tier}`)
                const embed = new EmbedBuilder()
                    .setTitle(`${oldMap.name}`)
                    .setDescription(`Tier ${oldMap.tier}`)
                    .setColor(0x0099FF)
                    embed.setURL(oldMap.link)
                    embed.setTimestamp()
                    embed.setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
                    embed.addFields(
                        { name: 'Ping:', value: `<@&${roles[oldMap.tier]}>` },
                )
                embed.setAuthor({name:`${interaction.user.tag} has edited a map for the map selection:`, iconURL:`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`})
            interaction.channel.send({embeds: [embed]}, {files: [file]});
            interaction.editReply('⠀')
            await oldMap.save()
            } else {
                interaction.editReply('That map does not exist.')
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