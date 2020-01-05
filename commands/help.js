const {prefix} = require('../config.json');
module.exports = {
  name: 'help',
  description: "List information about all available commands",
  aliases: ['commands'],
  usage: '[command name]',
  execute(message, args) {
      const data = [];
      const { commands } = message.client;

      if (!args.length) {
        data.push('Here\'s what I can do:');
        data.push(commands.map(command => command.name).join(', '));
        data.push(`Use \`${prefix}help [command name]\` to get more information on a specific command.`);
        return message.channel.send(data, {split: true});

      }

      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.channel.send('No such command :(');
      }
      data.push(`${command.name}: ${command.description}`);
      data.push(`Usage: ${prefix}${command.name} ${command.usage}`);
      message.channel.send(data, {split: true});
  },

}
