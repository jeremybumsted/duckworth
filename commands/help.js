const {prefix} = require('../config.json');
const Discord = require('discord.js');
module.exports = {
  name: 'help',
  description: "Show the help text for duckworth",
  aliases: ['commands'],
  usage: `\`${prefix}help or ${prefix}help [command]\``,
  execute(message, args) {
      const { commands } = message.client;

      if (!args.length) {
        const embed = new Discord.RichEmbed()
          .setColor('#5b6ee1')
          .attachFiles(['./images/duckworth-new.png'])
          .setTitle('Here\'s what I can do:')
          .setAuthor('Duckworth', 'attachment://duckworth-new.png')
          .addField('Available Commands', commands.map(command => command.name).join(', '))
          .addField('More Info', `Use \`${prefix}help [command name]\` to get more information on a specific command.`)
          .addField('Found a bug?', '[Submit an issue](https://git.io/JvvdO)');
        return message.channel.send(embed);
      }

      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.channel.send('No such command :(');
      }
      const embed = new Discord.RichEmbed()
        .setColor('#5b6ee1')
        .setTitle(`${command.name}`)
        .setDescription(`${command.description}`)
        .addField('Usage', `${command.usage}`);
      message.channel.send(embed);
  },

}
