const { Client, Collection } = require('discord.js');
const client = new Client({ disableEveryone: true});
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const TOKEN  = process.env.TOKEN;
const cooldowns = new Collection();
client.cooldowns = cooldowns;
const queue = new Map();
client.queue = queue;

const init = async () => {
	const evtFiles = await readdir("./src/events/");
	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		const event = require(`./events/${file}`);
		client.on(eventName, event.bind(null, client));
	});

	client.commands = new Enmap();

	const cmdFiles = await readdir("./src/commands/"); 
	cmdFiles.forEach(file => {
		if (!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split(".")[0];
		client.commands.set(commandName, props);
	});
}

init();

client.login(TOKEN);