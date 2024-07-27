const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require("discord.js");
const mapz = require('../../models/maps');
const record = require('../../models/times')
const galleries = require('../../models/gallery')
const buttons = [
  { id: 'PageLeft', label: '<--' },
  { id: 'PageRight', label: '-->' }
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
            let pageNumber = 1
            var matches = []
            const maps = await mapz.find({});
            if (interaction.options.get('map').value.includes("nsfw")) {
              var newmap = interaction.options.get('map').value.replace('nsfw', '')
            } else {
              var newmap = interaction.options.get('map').value
            }
            const gallery = await galleries.findOne({map: newmap})
            if (!gallery) {
                interaction.editReply('No board for that map.')
                return
            }
            for (const RecordToDisplayRn in gallery.pics) {
              matches.push(RecordToDisplayRn)
            }
            const mapsPerPage = 1;

            while (true) {
                const startIndex = (pageNumber - 1) * mapsPerPage;
                const endIndex = startIndex + mapsPerPage;
                console.log('a')
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
                console.log(readablemaps)
                console.log(readablemaps[0])
                const embed = new EmbedBuilder()
                    .setTitle(readablemaps[0].submitter)
                    .setDescription(readablemaps[0].caption)
                    .setFooter({text: `Entry ${pageNumber}, ${new Date(readablemaps[0].timestamp)}`})
                    .setImage(readablemaps[0].pic)
                const row = new ActionRowBuilder();
                buttons.forEach((role) => {
                  console.log('b')
                    row.components.push(
                        new ButtonBuilder()
                            .setCustomId(role.id)
                            .setLabel(role.label)
                            .setStyle(ButtonStyle.Primary)
                    );
                });

                console.log('c')

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
                  if (pageNumber < Math.ceil(gallery.pics.length)) {
                    pageNumber++;
                    await confirmation.update('⠀')
                  } else {
                    await confirmation.update('⠀')
                  }
                }
            }
        }  catch (e) { 
        console.error(e);
        await interaction.editReply({ content: 'Timeout', components: [] });
    }
    }
}