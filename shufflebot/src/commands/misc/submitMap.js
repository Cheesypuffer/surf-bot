const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const maps = require('../../models/maps')
module.exports = {
    name:'submitmap',
    description:'Submits a map to be used in the map selection.',
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
            required:true,
            type:ApplicationCommandOptionType.Integer
        },
        {
            name:'link',
            description:'link of map',
            required:true,
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
            const oldMap = await maps.findOne(query)
            const hasRole = interaction.member.roles.cache.has(interaction.guild.roles.cache.find(r => r.name === 'map curator'))
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
               
                const role = interaction.guild.roles.cache.get(`${roles[interaction.options.get('tier').value-1]}`)
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
    '1258966846372188330',
    '1256006955261235282',  
    '1256007585157484606',        
    '1256007785423044789',        
    '1256007829769293854',       
    '1256007936577241198',    
    '1256008022216675480',     
    '1256008084887703552',       
    '1256008138235318373',       
    '1256008173148442684',      
    '1256008211824377997',     
    '1256008250252595251',    
    '1256008299556376627',
]