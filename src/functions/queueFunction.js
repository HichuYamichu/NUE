module.exports = {
	async construct(client, serverQueue, message, song, voiceChannel, playlist) {
		const playFunction = require('../functions/playFunction');

		if (!serverQueue) {
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 1,
				playing: true
			};

			client.queue.set(message.guild.id, queueConstruct);
			queueConstruct.songs.push(song);

			const connection = await voiceChannel.join();
			queueConstruct.connection = await connection;
			await playFunction.play(client, message.guild, queueConstruct.songs[0]);
		} else {
			serverQueue.songs.push(song);
			if (playlist) return;
			else return message.channel.send(`${song.title} **has been added to the queue!**`);
		}
	}
};
