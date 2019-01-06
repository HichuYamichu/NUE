module.exports  = (client) => {

	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ game: { name: 'prefix: 🎶' }, status: 'online' });

}