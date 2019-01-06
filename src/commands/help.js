module.exports = {
	name: 'help',
	description: 'Lists all the commands.',
	cooldown: 5,
	args: false,
	usage: '',
	ownerOnly: false,
	run(client, message, serverQueue, args) {
		const { RichEmbed } = require('discord.js');
		const commands = client.commands;

		if (!args) {
			const embed = new RichEmbed()
				.setAuthor('Command list')
				.setDescription(`${commands.map(command => command.name).join('\n')} \n**${process.env.PREFIX}help [command_name]**`)
				.setColor('#7262c4');

			message.channel.send(embed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name);
		const data = [];

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
		data.push(`**Name:** ${command.name}`);

		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${process.env.PREFIX}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	}
};
