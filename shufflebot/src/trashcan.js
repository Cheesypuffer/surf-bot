require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`)

    client.user.setActivity({
        name: 'surf_rainbow 24/7',
        type: ActivityType.Custom
    })
});

client.on('messageCreate', (message) =>{
    if (message.author.bot) {
        return;
    }
    if (message.content === 'zest') {
        message.reply("zest");
    }
})



client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    if (interaction.commandName === 'randommap') {
        const tier = interaction.options.get('tier').value
        const map = maps[
        Math.floor(
            Math.random() * (maps.length)
        )];
        const embed = new EmbedBuilder()
            .setTitle(`${map.name}`)
            .setDescription(`Tier ${map.tier}`)
            .setColor('Random')
            .addFields(
            
            {
                name: 'Description',
                value: 'DescriptionContent'
            },
        );
        interaction.reply({embeds: [embed]});
    }
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        await interaction.deferReply({ephemeral:true})
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {
            interaction.reply({content: 'what'})
            return;
        }

        const hasRole = interaction.member.roles.cache.has(role.id)

        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`You are no longer a ${role}er. :p`)
            return;
        }

        await interaction.member.roles.add(role);
        await interaction.editReply(`You are now a ${role}er. c:`)
    }
})



client.login(
    process.env.TOKEN
);

const maps = [
    {
        name: 'surf_halofuse',
        tier: 2,
        icon: 'https://gamebanana.com/mods/embeddables/72103?type=large',
        link:'https://gamebanana.com/mods/72103'
    },
    {
        name: 'surf_utopia',
        tier: 1,
        icon: 'https://gamebanana.com/mods/embeddables/72161?type=large',
        link:'https://gamebanana.com/mods/72161'
    },
    {
        name: 'surf_rainbow',
        tier: 3,
        icon: 'https://gamebanana.com/mods/embeddables/72133?type=large',
        link:'https://gamebanana.com/mods/72133'
    },
    {
        name: 'surf_air_arena',
        tier: 1,
        icon: 'https://gamebanana.com/mods/embeddables/72068?type=large',
        link:'https://gamebanana.com/mods/72068'
    },
    {
        name: 'surf_forbidden_ways_reloaded',
        tier: 1,
        icon: 'https://gamebanana.com/mods/embeddables/122076?type=large',
        link:'https://gamebanana.com/mods/122076'
    }
];