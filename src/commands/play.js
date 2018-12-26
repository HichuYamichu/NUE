module.exports = {
	name: 'play',
	description: 'Playes music in a voice chat you\'re currently in.',
	cooldown: 10,
	args: true,
	usage: '<args>',
	guildOnly: true,
	ownerOnly: false,
	run(client, message, args) {

		const ytdl = require('ytdl-core');

		const { voiceChannel } = message.member;
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

		voiceChannel.join().then(connection => {
			let link = args.toString();

			if(!ytdl.validateURL(link)){
				voiceChannel.leave();
				return message.reply('invalid link');
			}
			ytdl.getInfo(link).then(info => {
				if(info.length_seconds > 660){
					voiceChannel.leave();
					return message.reply('too long must me less than 11 minutes');
				}
					const stream = ytdl(link, { filter: 'audioonly'});
					const dispatcher = connection.playStream(stream);
					dispatcher.setVolumeLogarithmic(1/4);
					dispatcher.on('end', () => voiceChannel.leave());
				
			}).catch(err => console.error(err));
		});
	},
};
