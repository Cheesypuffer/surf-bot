const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require("discord.js");
const mapz = require('../../models/maps');
const record = require('../../models/times')
const galleries = require('../../models/gallery')
const buttons = [
  { id: 'PageLeft', label: '<--' },
  { id: 'PageRight', label: '-->' },
  { id: 'ModeA', label: 'Date'},
  { id: 'ModeB', label: 'Poster'},
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('opengallery')
    .setDescription('Opens the gallery for a certain map')
    .addStringOption(option => 
        option.setName('map')
            .setDescription('the map to collect information from')
            .setRequired(true)
    ),

    async execute(interaction) {
        await interaction.deferReply();
        //const { default: prettyMs} = await import('pretty-ms')
        try {
            let sortingMode = 1;
            let pageNumber = 1;
            var matches = []
            const maps = await mapz.find({});
            const gallery = await galleries.findOne({map: interaction.options.get('map').value})
            if (!gallery) {
                interaction.editReply('No board for that map.')
            }
            for (const RecordToDisplayRn in gallery.pics) {
              matches.push(RecordToDisplayRn)
            }
            const mapsPerPage = 1;

            while (true) {
                const startIndex = (pageNumber - 1) * mapsPerPage;
                const endIndex = startIndex + mapsPerPage;
                



                if (sortingMode === 1) {
                 gallery.pics.sort((a, b) => a.timestamp - b.timestamp);
                } else if (sortingMode === 2) {
                 gallery.pics.sort((a, b) => {
                    const nameA = a.submitter.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.submitter.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    return 0;
                 })
                
                const readablemaps = gallery.pics.slice(startIndex, endIndex);
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

                const embed = new EmbedBuilder()
                    .setTitle(readablemaps[1].submitter)
                    .setDescription(readablemaps[1].caption)
                    .setFooter({text: `Entry ${pageNumber}, ${new Date(readablemaps[1].timestamp)}`})
                    .setImage(readablemaps[1].pic)
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
        } 
    } catch (e) {
        console.error(e);
        await interaction.editReply({ content: 'Timeout', components: [] });
    }
    }
}