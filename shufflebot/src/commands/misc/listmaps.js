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
            if ((chosenMap.upvotes.value+chosenMap.downvotes.value) <= 0) {
                var stars = 0
            } 
            
            else {
                var stars = votesToStars(chosenMap.upvotes.value, chosenMap.downvotes.value)
            }
            const tier = `T${chosenMap.tier}`
            readablemaps.push(`${chosenMap.upvotes.value},${chosenMap.downvotes.value}=${stars} / ${tier} / ${name}`)
        }
        var readableMapsString = readablemaps.toString()
        readableMapsString = readableMapsString.replace(/ *, */g, '\n');
        interaction.editReply(readableMapsString)
    }
}

// javascript function to convert amount of upvotes and downvotes to a number 1-5
function votesToStars(upvotes, downvotes) {
  return Math.min(Math.max(Math.round(upvotes/(downvotes+upvotes)*5),0),5);
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