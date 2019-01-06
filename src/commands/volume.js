module.exports = {
	name: 'volume',
	description: 'Sets volume.',
	cooldown: 2,
	args: true,
	ownerOnly: false,
	serverQueue: true,
	run(client, message, serverQueue, args) {
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0]);
		message.channel.send(`Volume set to ${args[0]}`);
	}
};
