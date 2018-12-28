module.exports = {
	name: 'stop',
	description: 'Stop playing music.',
	cooldown: 2,
	args: false,
	usage: '',
	ownerOnly: false,
	run(client, message, serverQueue) {

		return message.channel.send(`**Now playing:** ${serverQueue.songs[0].title}`)
	},
};
