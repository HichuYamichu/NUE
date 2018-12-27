module.exports = {
	name: 'play',
	description: 'Playes music in a voice chat you\'re currently in.',
	cooldown: 5,
	args: true,
	usage: '<args>',
	guildOnly: true,
	ownerOnly: false,
	async run(client, message, serverQueue, args) {
		const playFunction = require('../functions/playFunction')
		const ytdl = require('ytdl-core');
		const { voiceChannel } = message.member;
		const link = args.toString();

		if(!ytdl.validateURL(link)){
			return message.reply('invalid link!');
		}

		if(!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if(!permissions.has('CONNECT')){
			return message.channel.send('I don\'t have permissions to join this channel')
		}
		if(!permissions.has('SPEAK')){
			return message.channel.send('I don\'t have permissions to speak in this channel')
		}
		const info = await ytdl.getInfo(link);
		if(info.length_seconds > 660) return message.reply('too long must me less than 11 minutes!');
		
		const song = {
			title: info.title,
			URL: info.video_url
		}

		if(!serverQueue){
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 1,
				playing: true
			}

			client.queue.set(message.guild.id, queueConstruct);
			queueConstruct.songs.push(song);

			let connection = await voiceChannel.join()
			queueConstruct.connection = connection;
			playFunction.play(client, message.guild, queueConstruct.songs[0])

		}else{
			serverQueue.songs.push(song)
			return message.channel.send(`${info.title} has been added to queue`)
		}
	},
};
