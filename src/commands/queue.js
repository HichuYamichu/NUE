module.exports = {
	name: 'queue',
	description: 'Displayes queue.',
	cooldown: 2,
	args: false,
	ownerOnly: false,
	serverQueue: true,
	run(client, message, serverQueue, args) {
		message.channel.send(`**Queue:**\n${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
		`);
	}
};
