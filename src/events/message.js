module.exports = (client, message) => {
	const PREFIX = process.env.PREFIX;

	const Discord = require("discord.js");
	if (message.author.bot) return;
	if (message.content.indexOf(PREFIX) !== 0) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd = client.commands.get(command);
	if (!cmd) return;
	if (message.channel.type !== 'text') {
		return message.reply('You can\'t talk with me inside DMs!');
	}

	if(cmd.serverQueue && !client.queue.get(message.guild.id)) return message.channel.send('There is nothing in the queue.');

	//if(cmd.ownerOnly && message.author.id !== client.config.ownerID) return message.channel.send('This is owner only command, you can\'t use it.');

	if (cmd.args && !args.length) {
		let reply = `${message.author}, you must provide some arguments to use this command!`;
		if (cmd.usage) {
			reply += `\nExpected imput: \`${PREFIX}${cmd.name} ${cmd.usage}\``;
		}
		return message.channel.send(reply);
	}

	if (!client.cooldowns.has(cmd.name)) {
		client.cooldowns.set(cmd.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = client.cooldowns.get(cmd.name);
	const cooldownAmount = (cmd.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Wait ${timeLeft.toFixed(1)} second(s) before reusing the \`${cmd.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try{
		cmd.run(client, message, client.queue.get(message.guild.id), args);
	}
	catch(err){
		console.error(err);
		client.queue.delete(message.guild.id)
		message.channel.send(`Something went wrong! Fix now <@>`);
	}
};
