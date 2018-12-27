module.exports = {
	name: 'yt',
	description: 'searches YT.',
	cooldown: 3,
	args: true,
	usage: '<args>',
	guildOnly: false,
	ownerOnly: false,
	async run(client, message, serverQueue, args) {

		const Discord = require("discord.js");
		const YouTube = require('simple-youtube-api');
		const youtube = new YouTube();


		const query = await youtube.searchVideos(args.join(' '), 5);
		const vids = [];
			for(let i in query){
				vids[i] = `**${parseInt(i)+1}:** ${query[i].title}`;
			}
			message.channel.send(vids);

			const author = message.author.id;
			const msgFilter = message => !isNaN(message.content) && message.content < vids.length+1 && message.content > 0 && message.author.id === author;
			const collected = await message.channel.awaitMessages(msgFilter, { max: 1, time: 10000, errors: ['time'] })
			const value = collected.map(collected => collected.content);
			const id = query[parseInt(value)-1].id;
			const msg = await message.channel.send(`https://www.youtube.com/watch?v=${id}`);
			await msg.react('✅');
			await msg.react('❌');

			const acceptFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id == message.author.id;
			const accept = msg.createReactionCollector(acceptFilter, { time: 4000, maxEmojis: 1 });
			const declineFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id == message.author.id;
			const decline = msg.createReactionCollector(declineFilter, { time: 4000, maxEmojis: 1 });

			accept.on('collect', async (serverQueue) => {
				msg.channel.send('Accepted.')
			
			});

			decline.on('collect', () => {
				msg.channel.send('Declined.')
			});
	},
};