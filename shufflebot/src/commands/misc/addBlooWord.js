const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const blootorture = require('../../models/bloosinferno')
module.exports = {
    name:'addblooword',
    description:'heretic',
    options:[
        {
            name:'word',
            description:'word to add',
            required:true,
            type:ApplicationCommandOptionType.String
        },
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
                word: interaction.options.get('word').value
            }
            const options = { upsert : false }
            const oldMap = await blootorture.find({})
            console.log(oldMap)
            const hasRole = interaction.member.roles.cache.has('1257704302428815521')
            if (oldMap && hasRole) {
                var file = null
                var map = null
                const result = await blootorture.updateOne(query, {
                    $set: {
                        words: await blootorture.find({}).push(interaction.options.get('word').value)
                    }
                }, options)

               
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