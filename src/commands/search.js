module.exports = {
	name: 'yt',
	description: 'searches YT.',
	cooldown: 3,
	args: true,
	usage: '<args>',
	ownerOnly: false,
	async run(client, message, serverQueue, args) {

		const queueFunction = require('../functions/queueFunction')
		const validationFunction = require('../functions/validationFunction')
		const { voiceChannel } = message.member;


		const query = await client.youtube.searchVideos(args.toString().replace(',', ' '), 10);
		let index = 0
		await message.channel.send(query.map(vid => `**${++index}:** ${vid.title}`));
		await message.channel.send('**Provide a value to choose one of the search results.**');
		try{
			const author = message.author.id;
			const msgFilter = message => !isNaN(message.content) && message.content < query.length+1 && message.content > 0 && message.author.id === author;
			const collected = await message.channel.awaitMessages(msgFilter, { max: 1, time: 15000, errors: ['time'] });
			const value = parseInt(collected.first().content);
			const id = query[value-1].id;
			const msg = await message.channel.send(`https://www.youtube.com/watch?v=${id}`);
			await msg.react('✅');
			await msg.react('❌');
			await msg.channel.send('**Add to queue?**')
			const acceptFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id == message.author.id;
			const accept = await msg.createReactionCollector(acceptFilter, { time: 4000, maxEmojis: 1 });
			const declineFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id == message.author.id;
			const decline = await msg.createReactionCollector(declineFilter, { time: 4000, maxEmojis: 1 });

			await accept.on('collect', async () => {
				const song = {
					title: query[parseInt(value)-1].title,
					URL: `https://www.youtube.com/watch?v=${id}`
				}
				msg.channel.send('**Accepted.**')
				const responce = await validationFunction.check(voiceChannel, message, song.URL);
				if(responce === 'pass'){
					queueFunction.construct(client, serverQueue, message, song, voiceChannel);
				}else return;
			});

			await decline.on('collect', () => {
				msg.channel.send('**Declined.**');
			});
		}catch(err) {
			message.channel.send('**Time\'s up!**');
		}
	},
};