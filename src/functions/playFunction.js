module.exports = {
	async play(client, guild, song) {
		const serverQueue = client.queue.get(guild.id);
		const ytdl = require('ytdl-core-discord');
		if (!song) {
			serverQueue.voiceChannel.leave();
			client.queue.delete(guild.id);
			return;
		}
		const stream = await ytdl(song.URL);
		const dispatcher = await serverQueue.connection.playOpusStream(stream)
			.on('end', () => {
				console.log('song ended');
				serverQueue.songs.shift();
				this.play(client, guild, serverQueue.songs[0]);
			})
			.on('error', error => console.log(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		serverQueue.textChannel.send(`**Playing:** ${song.title}`);
	}
};
