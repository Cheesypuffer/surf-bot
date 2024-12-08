const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, SlashCommandBuilder} = require("discord.js");
const { default: mongoose } = require("mongoose");
const mapz = require('../../models/maps');
const { options } = require("./removeTime");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('upvote')
    .setDescription('upvote a map')
    .addStringOption(option => 
        option.setName('map')
            .setDescription('map to upvote')
            .setRequired(true)
    ),

    async execute(interaction) {
        await interaction.deferReply()
        var mapToVoteRaw = await mapz.findOne({name: interaction.options.get('map').value})
        var allMaps = await mapz.find({})
        var readablemaps = []
        var usuablemaps = []
        var mapToVote = mapToVoteRaw
        if (!mapToVoteRaw) {
            for(const mapToVote1 of allMaps) {
                if((mapToVote1.name).includes(interaction.options.get('map').value)) {
                    readablemaps.push(mapToVote1.name)
                    usuablemaps.push(mapToVote1)
                }
            }
            if(readablemaps.length === 1) {
                mapToVote = usuablemaps[0]
            } else if (readablemaps.length === 0) {
                interaction.editReply(`Map not found.`)
                return
            } else {
                var readableMapsString = readablemaps.toString()
                readableMapsString = readableMapsString.replace(/ *, */g, '\n');
                interaction.editReply(`Map not found. Did you mean: \n ${readableMapsString}`)
                return
            }
        }
        if ((mapToVote.upvotes.includes(interaction.user.id) === false) && (mapToVote.downvotes.includes(interaction.user.id) === false)) {
            var votes = mapToVote.upvotes
            votes.push(interaction.user.id)
            await mapToVote.save(votes)
            interaction.editReply(`Upvoted ${mapToVote.name}`)
        } else if(mapToVote.upvotes.includes(interaction.user.id) === false) {
            var votes = mapToVote.upvotes
            votes.push(interaction.user.id)
            await mapToVote.save(votes)
            const indx = mapToVote.downvotes.indexOf(interaction.user.id)
            mapToVote.downvotes.splice(indx, 1)
            await mapToVote.save(indx)
            interaction.editReply(`Upvoted ${mapToVote.name}`)
        } else {
            interaction.editReply(`Already upvoted ${mapToVote.name}`)
        }
    }
}