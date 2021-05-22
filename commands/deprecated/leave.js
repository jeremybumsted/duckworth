module.exports = {
	name: 'leave',
	description: 'Tell Duckworth to disconnect',
	usage: "`d!leave` to tell Duckworth to leave if it is *currently* connected to a voice channel",
	execute(message, args) {
    if (!message.guild) return;
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave()
        .then(connection => {
          message.reply(`Deuces`);
        })
        .catch(console.log);
    } else {
      message.reply('I can\'t leave a channel if I\`m not in one.');
      }

  }
};
