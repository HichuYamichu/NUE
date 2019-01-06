module.exports = {
	name: 'stop',
	description: 'Stop playing music.',
	cooldown: 2,
	args: false,
	usage: '',
	ownerOnly: false,
	serverQueue: true,
	run(client, message, serverQueue) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) {
			return message.reply('You can\'t stop playing music if you\'re not in a voice channel');
		}

		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	}
};
