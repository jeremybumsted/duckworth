const Discord = require ('discord.js');
const needle = require('needle');


module.exports = {
	name: 'quote',
	tag: 'fun',
	description: 'Get a random quote from Kanye West',
	usage: "d!quote\n Duckworth will reply to you with a random quote from Kanye",
	execute(message, args) {
		needle.get('https://api.kanye.rest/?format=json', function(error, response){
			if (!error && response.statusCode == 200)
				result = response['body']
				message.channel.send(result.quote)
				
		})
	}
}
