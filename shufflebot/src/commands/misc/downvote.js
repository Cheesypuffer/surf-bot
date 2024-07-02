const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const { default: mongoose } = require("mongoose");
const mapz = require('../../models/maps');
const { options } = require("./removeTime");

module.exports = {
    name:'downvote',
    description:'downvote a map',
    options: [
        {
            name:'map',
            description:'the map to downvote',
            required:true,
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply()
        var mapToVote = await mapz.findOne({name: interaction.options.get('map').value})
        if (mapToVote && (mapToVote.downvotes.includes(interaction.user.id) === false)) {
            var votes = mapToVote.downvotes
            votes.push(interaction.user.id)
            await mapToVote.save(votes)
            interaction.editReply('You hath downvoted thy map.')
        } else {
            interaction.editReply(`That map doesn't exist, or you have already downvoted it.`)
        }
    }
}