const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const { default: mongoose } = require("mongoose");
const records  = require('../../models/times')
const mapz = require('../../models/maps')
module.exports = {
    name:'queryrecords',
    description:'Queries the map records for a certain map.',
    options: [
        {
            name:'map',
            description:'the map to query for records',
            required:true,
            type:ApplicationCommandOptionType.String
        }
    ],

     /**
      * 
      * @param {Client} client 
      * @param {Interaction} interaction 
      * @returns 
      */

     callback: async(client, interaction) => {
        const { default: prettyMs} = await import('pretty-ms')
        await interaction.deferReply()
        var mapRecords = await records.find({map:interaction.options.get('map').value})
        var mapToDisplay = await mapz.findOne({name:interaction.options.get('map').value})
        if(!mapToDisplay) {
            var mapToVoteRaw = await mapz.findOne({name: interaction.options.get('map').value})
            var allMaps = await mapz.find({})
            var readablemaps = []
            var usuablemaps = []
            var map = mapToDisplay
            for(const mapToVote1 of allMaps) {
                if((mapToVote1.name).includes(interaction.options.get('map').value)) {
                    readablemaps.push(mapToVote1.name)
                    usuablemaps.push(mapToVote1)
                }
            }
            if(readablemaps.length === 1) {
                mapToDisplay = usuablemaps[0]
                mapRecords = await records.find(({map:usuablemaps[0].name}))
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
        var mapTimes = []
        for(const mapRecord of mapRecords) {
            var recordTime = mapRecord.time
            var user = await client.users.fetch(mapRecord.userId)
            var userTag = user.tag
            var recordProof = mapRecord.proof
            mapTimes.push({recordTime, userTag, recordProof})
        }
        /// Okay, so we got our sorting function here
        mapTimes.sort((a, b) => a.recordTime - b.recordTime);
        ///console.log(mapTimes)
        ///Now we gotta actually display the data. Hmm...
        var file = null
        var recordsToDisplay = mapTimes.slice(0, 20)
        var readableData = []
        for(const recordToDisplay of recordsToDisplay) {
            readableData.push({name: `${recordToDisplay.userTag} ${recordToDisplay.recordProof}`, value: `${prettyMs(recordToDisplay.recordTime*1000)}`})
        }
        const embed = new EmbedBuilder()
            .setTitle(`${mapToDisplay.name} Records`)
            .setDescription('Top 20')
            .setColor('Gold')
            .setTimestamp()
            if (mapToDisplay) {
                embed.setURL(mapToDisplay.link)
                file = new AttachmentBuilder(mapToDisplay.icon)
                embed.setImage(mapToDisplay.icon)
            } else {
                embed.setURL('https://cdn.discordapp.com/attachments/1256006687366713427/1257404840234057829/image.png?ex=66844903&is=6682f783&hm=936dfc01ea2b754f6936c731de493e7b8977c14dcda09cb9b5d9ba4c4e8f6bdd&')
                file = 'https://media.discordapp.net/attachments/1256006687366713427/1257000435462570077/Untitled.jpg?ex=6682d061&is=66817ee1&hm=4a6f24c89a27314977d3e6dfa0f0112824a34ae4cd9ce7c14cd155a9c2eb5f48&=&format=webp'
                embed.setImage('https://media.discordapp.net/attachments/1256006687366713427/1257000435462570077/Untitled.jpg?ex=6682d061&is=66817ee1&hm=4a6f24c89a27314977d3e6dfa0f0112824a34ae4cd9ce7c14cd155a9c2eb5f48&=&format=webp')
            }
            embed.addFields(readableData)
        interaction.channel.send({embeds: [embed]}, {files: [file]});
        interaction.editReply('⠀')
     }
}