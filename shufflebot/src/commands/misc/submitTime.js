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
        const query2 = ({userId: interaction.user.id}, {map: interaction.options.get('map').value})
        const hasRole = interaction.member.roles.cache.has('1257704302428815521')
        const oldRecord = await record.findOne(query2)
        if (query && hasRole) {
            const newRecord = new record({
                userId: interaction.user.id,
                guildId: interaction.guildId,
                map: interaction.options.get('map').value,
                time: interaction.options.get('time').value,
                proof: interaction.options.get('proof').value
            })

            if (oldRecord) {
                console.log("oldRecord is defined!!")
                console.log(oldRecord)
                console.log(oldRecord.time)
                console.log(newRecord.time)
                if(oldRecord.time>newRecord.time) {
                    const deletedRecord = await record.deleteOne({userId: interaction.user.id}, {map: interaction.options.get('map').value})
                    newRecord.save()
                    interaction.editReply(`You have submitted a new best time for ${interaction.options.get('map').value}`)
                    return
                } else if (oldRecord.time===newRecord.time) {
                    interaction.editReply('Down to the millisecond? No.')
                    return
                } else if (oldRecord.time<newRecord.time) {
                    interaction.editReply('That is not your best time')
                    return
                }
            }
            newRecord.save()
            interaction.editReply(`You have submitted a new time for ${interaction.options.get('map').value}`)
        } else if (!query) {
            interaction.editReply('The map that you are trying to submit a time to does not exist. Please ask a Curator to create the map, or check for typos.')
        } else {
            interaction.editReply(`You aren't allowed to do that`)
        }
    }
}