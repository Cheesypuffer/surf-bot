require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActivityType, Collection, Events, GatewayIntentBits, REST, Routes} = require('discord.js');
const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('node:path');



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