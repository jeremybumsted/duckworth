const Discord = require ('discord.js');
const request = require('request');
module.exports = {
	name: 'quote',
	description: 'Get a random quote from Kanye West',
	usage: "?quote replies with a random quote from Kanye",
	execute(message, args) {
      var kanye = request('https://api.kanye.rest?format=text', function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        message.channel.send(body);
        });
	},
};
