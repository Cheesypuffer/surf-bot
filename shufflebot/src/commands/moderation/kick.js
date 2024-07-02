const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'kick an user',
    devOnly: false,
    //testOnly: boolean
    options: [
        {
            name:'target-user',
            description:'user to kick',
            required:true,
            type:ApplicationCommandOptionType.Mentionable
        },
        {
            name:'reason',
            description:'why kick',
            required:false,
            type:ApplicationCommandOptionType.String
        },
    ],
    permissionsRequired: [PermissionFlagsBits.ModerateMembers],
    botPermissions: [PermissionFlagsBits.ModerateMembers],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "he was."

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

