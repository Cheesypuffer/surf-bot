require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActivityType, Collection, Events, GatewayIntentBits, REST, Routes} = require('discord.js');
const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('node:path');

var http = require('http'); http.createServer(function (req, res) { res.write("I'm alive"); res.end(); }).listen(8080); 

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});




(async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {})
        console.log('Connected to DB')
        
        client.login(
            process.env.TOKEN
        );
    } catch (error) {
        console.log(error)
    }
})()

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {return;}
        await interaction.deferReply({ephemeral:true})

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

let status = [
    {
        name: 'idk, surfing',
        type: ActivityType.Watching
    },
    {
        name: 'idk, wurfing',
        type: ActivityType.Watching
    },
    {
        name: 'skial players voting rainbow again',
        type: ActivityType.Watching
    },
]

const eventsPath = path.join('/home/runner/surf-bot/shufflebot/src/events', '');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	console.log(event)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
const getapplicationcommands = require('./utils/getApplicationCommands');
const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join('/home/runner/surf-bot/shufflebot/src/', 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const { clientId, guildId} = require('../config.json');

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
        const data1 = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: [] },
		);
        console.log(commands)

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

client.on('ready', (c) => {
    console.log(`${client.user.tag} is online.`)
    setInterval(() => {
        let random = Math.floor(Math.random()*status.length)
        client.user.setActivity(status[random])
    }, 2000)
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const comands = await interaction.guild.commands
	console.log(comands)
	console.log(comands.type)
	const comand = await comands.get(interaction.commandName)

	if (!comand) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await comand.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});












