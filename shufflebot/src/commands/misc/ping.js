const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, Colors} = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'returns client ping',
    async execute(client, interaction) {
        await interaction.deferReply()

        const reply = await interaction.fetchReply()
        
        const ping = reply.createdTimestamp - interaction.createdTimestamp


        const embed = new EmbedBuilder()
            .setTitle(`${ping}ms`)
            .setDescription(null)
            .setColor('Gold')
        interaction.editReply({embeds: [embed]});
    }
}
