module.exports = {
	name: 'ping',
	description: 'Ping!',
	usage: "This should be self explanatory",
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
