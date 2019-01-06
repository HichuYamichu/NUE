module.exports = {
	name: 'play',
	description: 'Playes music in a voice chat you\'re currently in.',
	cooldown: 5,
	args: true,
	usage: '<args>',
	ownerOnly: false,
	async run(client, message, serverQueue, args) {
		const queueFunction = require('../functions/queueFunction');
		const validationFunction = require('../functions/validationFunction');
		const playlistFunction = require('../functions/playlistFunction');
		const ytdl = require('ytdl-core');
		const { voiceChannel } = message.member;

		const responce = await validationFunction.check(voiceChannel, message, args[0]);
		if (responce === 'pass') {
			if (args[0].match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
				playlistFunction.handle(client, message, voiceChannel, args[0]);
			} else if (ytdl.validateURL(args[0])) {
				const query = await client.youtube.getVideo(args[0]);
				const song = {
					title: query.title,
					URL: `https://www.youtube.com/watch?v=${query.id}`
				};

				await queueFunction.construct(client, serverQueue, message, song, voiceChannel);
			} else {
				return message.reply('invalid link!');
			}
		}
	}
};
