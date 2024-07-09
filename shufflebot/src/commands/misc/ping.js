const {ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, Colors, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('returns client ping'),
    async execute(interaction) {
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
