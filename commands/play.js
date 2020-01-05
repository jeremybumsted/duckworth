module.exports = {
	name: 'play',
	description: 'Play a sound.',
	usage: "`?play [soundname]`",
	execute(message, args) {
    if (!message.guild) return;
    message.member.voiceChannel.join()
    .then (connection => {
      const dispatcher = connection.playFile(`C:/Users/jerem/OneDrive/Documents/github/duckworth/assets/${args}.mp3`);
    })
    .catch(console.error);
  }
};
