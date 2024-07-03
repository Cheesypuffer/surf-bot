const {Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const record = require('../../models/times')
const maps = require('../../models/maps')
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
        const query1 = {name: interaction.options.get('map').value}
        const query = await maps.findOne(query1)
        const hasRole = interaction.member.roles.cache.has('1257704302428815521')
        const oldRecord = await record.findOne({userId: interaction.user.id})
        if (query && hasRole) {
            const newRecord = new record({
                userId: interaction.user.id,
                guildId: interaction.guildId,
                map: interaction.options.get('map').value,
                time: interaction.options.get('time').value,
                proof: interaction.options.get('proof').value
            })
            if (oldRecord) {
                if(oldRecord.time>newRecord.time) {
                    await record.deleteOne({userId: interaction.user.id})
                    newRecord.save()
                    interaction.editReply(`You have submitted a new time for ${interaction.options.get('map').value}`)
                    return
                } elseif (oldRecord.time===newRecord.time) ;{
                    interaction.editReply('Down to the millisecond? No.')
                } elseif (oldRecord.time<newRecord.time) ;{
                    interaction.editReply('That is not your best time')
                }
            }
            newRecord.save()
            interaction.editReply(`You have submitted a new time for ${interaction.options.get('map').value}`)
            ///recordchannel.send(`${interaction.user} has achieved a time of ${interaction.options.get('time').value} on ${interaction.options.get('map').value}, ${interaction.options.get('proof').url}`)
        } else if (!query) {
            interaction.editReply('The map that you are trying to submit a time to does not exist. Please ask a Curator to create the map, or check for typos.')
        } else {
            interaction.editReply(`You aren't allowed to do that`)
        }
    }
}