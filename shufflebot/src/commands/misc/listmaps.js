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
            ///const stars = ///starsToString(votesToStars(chosenMap.upvotes, chosenMap.downvotes))
            if ((chosenMap.upvotes+chosenMap.downvotes) === 0) {
                var stars = 0
            } else {
                const stars = (chosenMap.upvotes - chosenMap.downvotes)/(chosenMap.upvotes+chosenMap.downvotes)
            }
            const tier = `T${chosenMap.tier}`
            readablemaps.push(`${stars} / ${tier} / ${name}`)
        }
        var readableMapsString = readablemaps.toString()
        readableMapsString = readableMapsString.replace(/ *, */g, '\n');
        interaction.editReply(readableMapsString)
    }
}

// javascript function to convert amount of upvotes and downvotes to a number 1-5
function votesToStars(upvotes, downvotes) {
    // Calculate the total votes
    const totalVotes = upvotes + downvotes;
    // Handle edge case: Zero votes
    if (totalVotes === 0) {
      return 0; // Return 0 stars if there are no votes
    }
    // Calculate the proportion of upvotes
    const upvoteProportion = upvotes / totalVotes;
    // Scale the proportion to a 1-5 star range
    let stars = upvoteProportion * 5;
    // Ensure stars are within the 1-5 range
    stars = Math.max(1, Math.min(5, stars));
    return stars;
  } 
  // converts int 0-5 to star emojis
  function starsToString(starz) {
    let string = '';
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(starz)) {
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
  console.log(starsToString(votesToStars(0, 0))); // Should output '☆☆☆☆☆' (0 filled stars)