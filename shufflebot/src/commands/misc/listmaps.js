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
            const name = chosenMap.name
            const stars = starsToString(votesToStars(chosenMap.upvotes, chosenMap.downvotes))
            const tier = `T${chosenMap.tier}`
            readablemaps.push(`${stars} / ${tier} / ${name}`)
        }
        var readableMapsString = readablemaps.toString()
        readableMapsString = readableMapsString.replace(/ *, */g, '\n');
        interaction.editReply(readableMapsString)
    }
}

// javascript function to convert amount of upvotes and downvotes to a number 1-5
function votesToStars(upvotes,downvotes) {
    return upvotes/(upvotes+downvotes)*5;
  }
  // converts int 0-5 to star emojis
  function starsToString(stars) {
    // define return value
    string = '';
    // i = the index of star we are on. i only goes to 5
    for (let i=1; i<5; i++) {
      // if the index of the star we are on is less than the total filled stars (stars variable), than add a filled star
      if (i<Math.round(stars)) {
        string+='★';
      // if not, add an empty star
      } else {
        string+='☆';
      }
    }
    // return the string
    return string
  }