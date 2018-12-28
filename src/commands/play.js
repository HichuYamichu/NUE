module.exports = {
	name: 'play',
	description: 'Playes music in a voice chat you\'re currently in.',
	cooldown: 5,
	args: true,
	usage: '<args>',
	ownerOnly: false,
	async run(client, message, serverQueue, args) {
		const queueFunction = require('../functions/queueFunction')
		const validationFunction = require('../functions/validationFunction')
		const { voiceChannel } = message.member;
		const link = args[0];
		
		const responce = await validationFunction.check(voiceChannel, message, link)
		if(responce === 'pass'){
			const query = await client.youtube.getVideo(link);
			const song = {
				title: query.title,
				URL: `https://www.youtube.com/watch?v=${query.id}`
			}
			queueFunction.construct(client, serverQueue, message, song, voiceChannel)
		}else return;
	},
};
