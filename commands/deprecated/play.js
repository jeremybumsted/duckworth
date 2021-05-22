//Get a list of available sound files to be referenced
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, '../assets');
//passsing directoryPath and callback function
var sounds = [];
var soundboard = fs.readdirSync(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you swant to do with the file
        sounds.push(file.slice(0,-4));
    });
    // Once we have all the files, we'll format them nicely:
    return sounds;
});
soundboard = soundboard.toString().replace(/.mp3/g, "");

/* actual command */
module.exports = {
  name:'play',
	description: `Play a sound from the currently available sounds:\n\`\`\`${soundboard}\`\`\``,
	usage: "`d!play [soundname]`",
	execute(message, args) {
    if (!message.guild) return;
    message.member.voiceChannel.join()
    .then (connection => {
      const dispatcher = connection.playFile(`../assets/${args}.mp3`);
    })
    .catch(console.error);
  }
};
