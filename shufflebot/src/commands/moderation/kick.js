const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server.')
        .setDefaultMemberPermissons(PermissionsFlagsBits.KickMembers)
        .addMentionableOption(option => 
            option.setName('target-user')
                .setDescription('The user to kick.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Why the user must be kicked.')
                .setRequired(false)
        ),

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "i dont know ?? they didn't say. what am i supposed to do, come up with some BULLSHIT excuse, some ChatGPT shit? No. I'm not an omnipotent deity capable of reading minds, and neither are you."

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
            await targetUser.kick({reason})
            await interaction.editReply(`${targetUser} was kicked because ${reason}`)
        } catch (error) {
            console.log(error)
        }
    }
}

