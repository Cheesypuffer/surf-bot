const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require("discord.js");
const mapz = require('../../models/maps');
const record = require('../../models/times')
const dmaps = require('../../models/dmaps')
const buttons = [
  { id: 'PageLeft', label: '<--' },
  { id: 'PageRight', label: '-->' },
  { id: 'ModeA', label: 'Name'},
  { id: 'ModeB', label: 'Rating'},
  { id: 'ModeC', label: 'Tier'}
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('listmaps')
    .setDescription('Lists the maps currently in the map selection.'),

    async execute(interaction) {
        await interaction.deferReply();
        //const { default: prettyMs} = await import('pretty-ms')
        try {
            let sortingMode = 1;
            let pageNumber = 1;
            var matches = []
            const maps = await mapz.find({});
            const records = await record.find({userId: interaction.user.id})
            for (const RecordToDisplayRn in records) {
              matches.push(RecordToDisplayRn.map)
            }
            const mapsPerPage = 20;

            while (true) {
                const startIndex = (pageNumber - 1) * mapsPerPage;
                const endIndex = startIndex + mapsPerPage;
                var dmapz = await dmaps.find({})
                console.log(dmapz)

                const selectedMaps = maps.map(chosenMap => {
                    const name = (chosenMap.name)
                    ///const query = ({userId: interaction.user.id}, {map: name})
                    const stars = votesToStars(chosenMap.upvotes.length, chosenMap.downvotes.length);
                    const tier = `T${chosenMap.tier}`;
                    const query3 = ({map: chosenMap.name})
                    for(const dmap in dmapz) {
                      console.log(dmap)
                      console.log(dmap.map)
                      console.log(chosenMap.name)
                      console.log('a')
                      if(dmap.map === chosenMap.name) {
                        var dtier = dmap.dtier
                        console.log('dtier found')
                        break
                      }
                    }
                    ///var mapRecordForMap = await record.findOne(query)
                    if(dtier) {
                      console.log('found dmap')
                      return `${starsToString(stars)} | ${dtier} ${tier} | ${name}`
                    } else {
                      return `${starsToString(stars)} | ${tier} | ${name}`
                    }
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