const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeoutuser')
        .setDescription('put someone in the chair')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addMentionableOption(option => 
            option.setName('target-user')
                .setDescription('user to timeout')
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('seconds')
                .setDescription('seconds')
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('minutes')
                .setDescription('minutes')
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('hours')
                .setDescription('hours')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('why timeout')
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
            const { default: prettyMs} = await import('pretty-ms')
            const secondsToBan = ((interaction.options.get('seconds').value)) + (interaction.options.get('minutes').value*60) + ((interaction.options.get('hours').value*3600))
            if (targetUser.isCommunicationDisabled) {
                await targetUser.timeout(secondsToBan*1000, {reason})
                await interaction.editReply(`${targetUser}'s timeout was updated to ${prettyMs(secondsToBan*1000, {verbose:true})} because ${reason}`)
                return
            }
            
            await targetUser.timeout(secondsToBan*1000, {reason})
            await interaction.editReply(`${targetUser} was timed out for ${prettyMs(secondsToBan, {verbose:true})}because ${reason}`)
        } catch (error) {
            console.log(error)
        }
    }
}

