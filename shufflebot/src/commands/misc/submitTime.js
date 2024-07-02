const {Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const record = require('../../models/times')
const mapzz = require('../../models/maps')
module.exports = {
    name:'submittime',
    description:'Submit your best time on a map to the database.',
    options: [
        {
            name:'map',
            description:'map you got the time on',
            required:true,
            type:ApplicationCommandOptionType.String
        },
        {
            name:'time',
            description:'the time that it took you to beat the surf, in seconds',
            required:true,
            type:ApplicationCommandOptionType.Number
        },
        {
            name:'proof',
            description:'a video of you achieving your time.',
            required:true,
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
        const query = mapzz.findOne({name: `${interaction.options.get('map').value}`})
        const hasRole = interaction.member.roles.cache.has('1257704302428815521')
        if (query && hasRole) {
            const newRecord = new record({
                userId: interaction.user.id,
                guildId: interaction.guildId,
                map: interaction.options.get('map').value,
                time: interaction.options.get('time').value,
                proof: interaction.options.get('proof').value
            })
            await newRecord.save()
            const { default: prettyMs} = await import('pretty-ms')
            const recordchannel = client.channels.cache.get('1256343173748359379')
            interaction.editReply('New record submitted.')
            const embed = new EmbedBuilder()
            .setTitle(`${interaction.options.get('map').value}`)
            .setDescription(`${prettyMs(interaction.options.get('time').value*1000, {verbose: true})}`)
            .setColor('Gold')
            .addFields(
            
            {
                name: `Author: ${interaction.user.tag}`,
                value: `${interaction.options.get('proof').value}`
            },
        );
            ///recordchannel.send(`${interaction.user} has achieved a time of ${interaction.options.get('time').value} on ${interaction.options.get('map').value}, ${interaction.options.get('proof').url}`)
            recordchannel.send({embeds: [embed]})
            recordchannel.send(`${interaction.options.get('proof').value}`)
        }
    }
}