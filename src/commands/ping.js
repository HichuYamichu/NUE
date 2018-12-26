module.exports = {
	name: 'ping',
	description: 'Responds with "Pong!" and delay time in ms.',
	cooldown: 5,
	args: false,
	usage: '',
	guildOnly: true,
	ownerOnly: false,
	async run(client, message) {
		const msg = await message.channel.send("Ping?");
		msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	},
};
