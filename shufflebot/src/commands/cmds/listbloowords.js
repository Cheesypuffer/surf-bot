const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require("discord.js");
const mapz = require('../../models/bloosinferno');
const record = require('../../models/times')
const buttons = [
  { id: 'PageLeft', label: '<--' },
  { id: 'PageRight', label: '-->' }
]

module.exports = {
    data: new SlashCommandBuilder()
    .setName('listbloowords')
    .setDescription('Lists the bloo words currently in the bloo selection.'),

    async execute(interaction) {
        await interaction.deferReply();
        //const { default: prettyMs} = await import('pretty-ms')
        try {
            let sortingMode = 1;
            let pageNumber = 1;
            var matches = []
            const maps = await mapz.findOne({});
            const mapsPerPage = 20;

            while (true) {

                const readablemaps = maps.words.slice(startIndex, endIndex);
                //readablemaps.sort((a, b) => {
                  //const nameA = a.split('| ')[2]
                  //const nameB = b.split('| ')[2]
                  //const prA = getRecord(interaction.user.id, nameA)
                  //const prB = getRecord(interaction.user.id, nameB)
                  //console.log(prA)
                  //console.log(prB)
                  //prA.then(function(value) {

                  //})
                //})
                const readableMapsString = (readablemaps).join('\n');

                const embed = new EmbedBuilder()
                    .setTitle('Bloo list')
                    .setDescription(readableMapsString)
                    .setFooter({text: `Page ${pageNumber}`});

                const row = new ActionRowBuilder();
                buttons.forEach((role) => {
                    row.components.push(
                        new ButtonBuilder()
                            .setCustomId(role.id)
                            .setLabel(role.label)
                            .setStyle(ButtonStyle.Primary)
                    );
                });

               const response = await interaction.editReply({
                    content: '⠀', // Workaround for a Discord API bug where an empty string might cause the embed not to display
                    components: [row],
                    embeds: [embed],
                });

                const collectorFilter = i => i.user.id === interaction.user.id;
                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 600000 });

                if (confirmation.customId === 'PageLeft') {
                    if (pageNumber > 1) {
                        pageNumber--;
                        await confirmation.update('⠀')
                    } else {
                      await confirmation.update('⠀')
                    }
                } else if (confirmation.customId === 'PageRight') {
                  if (pageNumber < Math.ceil(maps.length/20)) {
                    pageNumber++;
                    await confirmation.update('⠀')
                  } else {
                    await confirmation.update('⠀')
                  }
                } else if (confirmation.customId === 'ModeA') {
                  if (!(sortingMode===1)) {
                    sortingMode = 1
                    await confirmation.update('⠀')
                  } else {
                    await confirmation.update('⠀')
                  }
                } else if (confirmation.customId === 'ModeB') {
                  if (!(sortingMode===2)) {
                    sortingMode = 2
                    await confirmation.update('⠀')
                  } else {
                    await confirmation.update('⠀')
                  }
                } else if (confirmation.customId === 'ModeC') {
                  if (!(sortingMode===3)) {
                    sortingMode = 3
                    await confirmation.update('⠀')
                  } else {
                    await confirmation.update('⠀')
                  }
                }
            }
        } catch (e) {
            console.error(e);
            await interaction.editReply({ content: 'Timeout', components: [] });
        }
    }
};

function votesToStars(upvotes, downvotes) {
    return Math.min(Math.max(Math.round((upvotes) / (downvotes + upvotes) * 5), 0), 5);
}

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

async function getRecord(user, map) {
  const recordToReturn = await record.findOne(({map: map}, {userId: user}))
  return recordToReturn
}