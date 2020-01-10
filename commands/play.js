//Get a list of available sound files to be referenced
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
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
soundboard = soundboard.toString().replace(/.mp3/g, "").split(',').join('\n');

/*TODO: create embed for help command
const embed = new Discord.RichEmbed()
  .setColor('#5b6ee1')
  .setTitle('Play')
  .setDescription('Play a sound from the list of available sounds below.')
  .addField('Available Sounds', soundboard)
  .addField('Usage', "`?play [soundname]`");
*/
/* actual command */
module.exports = {
  name:'play',
	description: `Play a sound. Here are the currently available sounds:\n${soundboard}`,
	usage: "`?play [soundname]`",
	execute(message, args) {
    if (!message.guild) return;
    message.member.voiceChannel.join()
    .then (connection => {
      const dispatcher = connection.playFile(`../assets/${args}.mp3`);
    })
    .catch(console.error);
  }
};
