const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction} = require("discord.js");
const { default: mongoose } = require("mongoose");
const records  = require('../../models/times')
const mapz = require('../../models/maps')

module.exports = {
    name:'listmaps',
    description:'Lists the maps currently in the map selection.',

    callback: async (client, interaction) => {
        await interaction.deferReply()
        const maps = await mapz.find({})
        var readablemaps = []
        for (chosenMap of maps) {
            readablemaps.push(chosenMap.name)
        }
        var readableMapsString = readablemaps.toString()
        readableMapsString = readableMapsString.replace(/ *, */g, '<br>');
        interaction.editReply(readableMapsString)
    }
}