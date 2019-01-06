module.exports = {
	 check(voiceChannel, message) {
		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		const permissions = voiceChannel.permissionsFor(message.client.user);

		if (!permissions.has('CONNECT')) {
			return message.channel.send('I don\'t have permissions to join this channel');
		}

		if (!permissions.has('SPEAK')) {
			return message.channel.send('I don\'t have permissions to speak in this channel');
		}
		return 'pass';
	}
};
