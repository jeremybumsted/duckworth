module.exports = {
	name: 'join',
	description: 'Have Duckworth join the channel you are currently connected to.',
	usage: "`?join` to join to your currently connected channel",
	execute(message, args) {
		if (!message.guild) return;
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          message.reply(`Joined the channel!`);
        })
        .catch(console.log);
    } else {
      message.reply('I can\'t join a channel if you aren\'t in one yet.');
      }
    }
};
