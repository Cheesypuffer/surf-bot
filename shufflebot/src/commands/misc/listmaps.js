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
    // find the ratio between upvotes and downvotes (decimal between 0-1) and multiply it by 5
    const netVotes = upvotes - downvotes;
    // Calculate the stars based on the net votes
    let stars = (netVotes / (upvotes + downvotes)) * 5;
    return clamp(stars, 0, 5)
  }
  
  // converts int 0-5 to star emojis
  function starsToString(stars) {
    let string = '';
    for (let i = 0; i < 5; i++) {
      if (i-2 < Math.round(stars)) {
        string += '★';
      } else {
        string += '☆';
      }
    }
    return string;
  }
  
  // Example usage
  console.log(starsToString(votesToStars(10, 5))); // Should output '★★★☆☆' (3 filled stars)
  console.log(starsToString(votesToStars(2, 8))); // Should output '☆☆☆☆☆' (0 filled stars)

  function clamp(num, lower, upper) {
    return Math.min(Math.max(num, lower), upper);
}