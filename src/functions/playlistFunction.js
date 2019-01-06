module.exports = {
	async handle(client, message, voiceChannel, url) {
		const queueFunction = require('../functions/queueFunction');
		const { youtube } = client;
		const playlist = await youtube.getPlaylist(url);
		const videos = await playlist.getVideos();
		for (const video of Object.values(videos)) {
			const video2 = await youtube.getVideoByID(video.id);
			const song = {
				title: video2.title,
				URL: `https://www.youtube.com/watch?v=${video2.id}`
			};
			const serverQueue = client.queue.get(message.guild.id);
			await queueFunction.construct(client, serverQueue, message, song, voiceChannel, true);
			console.log(serverQueue);
		}
	}
};
