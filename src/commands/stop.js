module.exports = {
	name: 'stop',
	description: 'Stop playing music.',
	cooldown: 2,
	args: false,
	usage: '',
	guildOnly: true,
	ownerOnly: false,
	run(client, message) {

		const { voiceChannel } = message.member;
		if (!voiceChannel) {
			return message.reply('You can\'t stop playing music if you\'re not in a voice channel');
		}
		voiceChannel.leave();
	},
};
