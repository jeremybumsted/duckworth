module.exports = {
	name: 'ping',
	tag: 'system',
	description: 'Ping!',
	usage: "This should be self explanatory",
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
