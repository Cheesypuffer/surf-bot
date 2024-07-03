const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder, Client, Interaction, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const { default: mongoose } = require("mongoose");
const records  = require('../../models/times')
const mapz = require('../../models/maps')
const buttons = [
  {
    id:'PageLeft',
    label:'<--'
  },
  {
    id:'PageRight',
    label:'-->'
  },
]

module.exports = {
    name:'listmaps',
    description:'Lists the maps currently in the map selection.',

    callback: async (client, interaction) => {
        await interaction.deferReply()
        const maps = await mapz.find({})
        var readablemaps = []
        var pageNumber = 1
        for (let i = pageNumber-1; i<pageNumber+20; i++) {
          const chosenMap = maps[i]
          const name = chosenMap.name
          ///const stars = ///starsToString(votesToStars(chosenMap.upvotes, chosenMap.downvotes))
          if ((chosenMap.upvotes.length+chosenMap.downvotes.length) <= 0) {
            var stars = '☆☆☆☆☆'
          } 
                      
          else {
            var stars = starsToString(votesToStars(chosenMap.upvotes.length, chosenMap.downvotes.length))
          }
          const tier = `T${chosenMap.tier}`
          readablemaps.push(`${stars} / ${tier} / ${name}`)
        }
        var readableMapsString = readablemaps.toString()
        readableMapsString = readableMapsString.replace(/ *, */g, '\n');
        const embed = new EmbedBuilder()
        .setTitle('Map list')
        .setDescription(readableMapsString)
        .setFooter({text: `Page ${pageNumber}`})
        const row = new ActionRowBuilder();
        buttons.forEach((role) => {
          row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary))
        })
        const response = interaction.channel.send(
          {components: [row], embeds: [embed]}
        )
        interaction.editReply(`\n`)
        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
	        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 600_000 });

          if(confirmation.customId === 'PageLeft') {
            if (pageNumber > 1) {
              pageNumber--
              this.callback(client, interaction)
            }
          }

          if(confirmation.customId === 'PageRight') {
            pageNumber++
            this.callback(client, interaction)
          }
        } catch (e) {
	      await interaction.editReply({ content: 'Timeout', components: [] });
        }
    }
}

// javascript function to convert amount of upvotes and downvotes to a number 1-5
// javascript function to convert amount of upvotes and downvotes to a number 1-5
function votesToStars(upvotes, downvotes) {
  return Math.min(Math.max(Math.round((upvotes)/(downvotes+upvotes)*5),0),5);
}

// converts int 0-5 to star emojis
function starsToString(stars) {
  let string = '';
  for (let i = 0; i < 5; i++) {
    if (i < Math.round(stars)) {
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

