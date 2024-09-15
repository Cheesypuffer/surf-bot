const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('banuser')
    .setDescription('Bans a member from the server')
    ///.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addMentionableOption(option => 
        option.setName('target-user')
            .setDescription('user to ban')
            .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('reason')
            .setDescription('why ban')
            .setRequired(false)
    ),

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "they didn't give a reason."

        await interaction.deferReply()

        const targetUser = await interaction.guild.members.fetch(targetUserId)

        if (!targetUser) {
            await interaction.editReply("that user is gone")
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply('you cant do that')
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position

        const requestUserRolePosition = interaction.member.roles.highest.position

        const botRolePosition = interaction.guild.members.me.roles.highest.position

        if (targetUserRolePosition >=  requestUserRolePosition) {
            await interaction.editReply('no')
            return
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("the bot cant do that")
            return
        }

        //ban that guy

        try {
            await targetUser.ban({reason})
            await interaction.editReply(`${targetUser} was banned because ${reason}`)
        } catch (error) {
            console.log(error)
        }
    }
}

