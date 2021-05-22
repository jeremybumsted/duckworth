const {prefix} = require('../config.json');
const Discord = require('discord.js');
const _ = require('lodash');

function filterCommands(tag, commands) {
  
  let result = []
  c = Object.fromEntries(commands)
  filter = _.filter(c, {'tag': tag})

    for (const i in filter) {
     result.push(filter[i].name)
    }

  return result.join(`, `)
}


module.exports = {
  
  name: 'help',
  tag: 'system',
  description: "Show the help text for duckworth",
  aliases: ['commands'],
  usage: `\`${prefix}help or ${prefix}help [command]\``,
  
  
  execute(message, args) {
      const { commands } = message.client;

      rpgTag = filterCommands('rpg', commands)
      systemTag = filterCommands('system', commands)
      funTag = filterCommands('fun', commands)

    //tags: system, fun, rpg
      if (!args.length) {
        const embed = new Discord.MessageEmbed()
          .setColor('#5b6ee1')
          .setTitle('Available Commands:')
          .setDescription(`Use \`${prefix}help [command name]\` to get more information on a specific command.`)
          .addField('Fun', funTag)
          .addField('RPG', rpgTag)
          .addField('System', systemTag)
          .addField('Found a bug?', '[Submit an issue](https://git.io/JvvdO)');
        return message.channel.send(embed);
      }

      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.channel.send('No such command :(');
      }
      const embed = new Discord.MessageEmbed()
        .setColor('#5b6ee1')
        .setTitle(`${command.name}`)
        .setDescription(`${command.description}`)
        .addField('Usage', `${command.usage}`);
      message.channel.send(embed);
  },

}
