const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const { default: mongoose } = require("mongoose");
const mapz = require('../../models/maps');
const { options } = require("./removeTime");

module.exports = {
    name:'upvote',
    description:'upvote a map',
    options: [
        {
            name:'map',
            description:'the map to upvote',
            required:true,
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply()
        var mapToVote = await mapz.findOne({name: interaction.options.get('map').value})
        if (mapToVote) {
            var votes = mapToVote.upvotes
            votes.push(interaction.user.id)
            await mapToVote.save(votes)
            interaction.editReply('You hath upvoted thy map.')
        } else {
            interaction.editReply(`That map doesn't exist!`)
        }
    }
}