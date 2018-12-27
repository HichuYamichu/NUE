module.exports = {
	name: 'stop',
	description: 'Stop playing music.',
	cooldown: 2,
	args: false,
	usage: '',
	ownerOnly: false,
	serverQueue: false,
	async run(client, message, serverQueue, args) {

		const YouTube = require('simple-youtube-api');
		const youtube = new YouTube('AIzaSyCbzRu0Gmidh5yo3yQzzBvlR7-yKEZo8gk');
		const link = args.toString().replace(/<(.+)>/g, '$1');
		const vids = await youtube.searchVideos(link, 5)
			await console.log(vids);
	},
};
