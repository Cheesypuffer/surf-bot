const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const maps = require('../../models/maps')
module.exports = {
    name:'editmap',
    description:'editor.',
    options:[
        {
            name:'name',
            description:'name of map',
            required:true,
            type:ApplicationCommandOptionType.String
        },
        {
            name:'tier',
            description:'tier of map',
            required:false,
            type:ApplicationCommandOptionType.Integer
        },
        {
            name:'link',
            description:'link of map',
            required:false,
            type:ApplicationCommandOptionType.String
        },
        {
            name:'icon',
            description:'icon of map',
            required:false,
            type:ApplicationCommandOptionType.String
        },
        {
            name:'thumbnail',
            description:'thumbnail of map',
            required:false,
            type:ApplicationCommandOptionType.String
        }
    ],

        /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
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
               
                const role = interaction.guild.roles.cache.get(`${roles[interaction.options.get('tier').value-1]}`)
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
    Client.guild.roles.cache.some(r => r.name === 'Tier 0'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 1'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 2'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 3'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 4'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 5'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 6'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 7'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 8'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 9'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 10'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 11'),
    Client.guild.roles.cache.some(r => r.name === 'Tier 12'),
]