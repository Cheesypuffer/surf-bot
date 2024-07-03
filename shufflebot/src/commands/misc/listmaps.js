const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const mapz = require('../../models/maps');

const buttons = [
  { id: 'PageLeft', label: '<--' },
  { id: 'PageRight', label: '-->' },
  { id: 'ModeA', label: 'Name'},
  { id: 'ModeB', label: 'Rating'},
  { id: 'ModeC', label: 'Tier'}
];

module.exports = {
    name: 'listmaps',
    description: 'Lists the maps currently in the map selection.',

    callback: async (client, interaction) => {
        await interaction.deferReply();

        try {
            let sortingMode = 1;
            let pageNumber = 1;
            const maps = await mapz.find({});
            const mapsPerPage = 20;

            while (true) {
                const startIndex = (pageNumber - 1) * mapsPerPage;
                const endIndex = startIndex + mapsPerPage;
                


                const selectedMaps = maps.map(chosenMap => {
                    const name = (chosenMap.name)
                    const stars = votesToStars(chosenMap.upvotes.length, chosenMap.downvotes.length);
                    const tier = `T${chosenMap.tier}`;
                    return `${starsToString(stars)} | ${tier} | ${name}`;
                });
                if (selectedMaps.length === 0) {
                  break; // No more maps to display
              }
                
                if (sortingMode === 1) {
                  selectedMaps.sort((a, b) => {
                    const nameA = a.split('| surf_')[1]
                    const nameB = b.split('| surf_')[1]
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                } else if (sortingMode === 2) {
                  selectedMaps.sort()
                } else if (sortingMode === 3) {
                  selectedMaps.sort((a, b) => {
                    const nameA = a.split('| T')[1]
                    const nameB = b.split('| T')[1]
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                }
                const readablemaps = selectedMaps.slice(startIndex, endIndex);
                const readableMapsString = (readablemaps).join('\n');

                const embed = new EmbedBuilder()
                    .setTitle('Map list')
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
                    console.log(sortingMode)
                    await confirmation.update('⠀')
                  } else {
                    await confirmation.update('⠀')
                  }
                } else if (confirmation.customId === 'ModeB') {
                  if (!(sortingMode===2)) {
                    sortingMode = 2
                    console.log(sortingMode)
                    await confirmation.update('⠀')
                  } else {
                    await confirmation.update('⠀')
                  }
                } else if (confirmation.customId === 'ModeC') {
                  if (!(sortingMode===3)) {
                    sortingMode = 3
                    console.log(sortingMode)
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
