module.exports = {
	name: 'stop',
	description: 'Stop playing music.',
	cooldown: 2,
	args: false,
	usage: '',
	ownerOnly: false,
	async run(client, message, serverQueue, args) {
		const ytdl = require('ytdl-core');
		const info = await ytdl.getInfo(args[0]);
		await console.log(info);
	}
};
