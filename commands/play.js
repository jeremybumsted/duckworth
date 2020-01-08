module.exports = {
	name: 'play',
	description: 'Play a sound.',
	usage: "`?play [soundname]`",
	execute(message, args) {
    if (!message.guild) return;
    message.member.voiceChannel.join()
    .then (connection => {
      const dispatcher = connection.playFile(`/home/jbumsted/duckworth/assets/${args}.mp3`);
    })
    .catch(console.error);
  }
};
