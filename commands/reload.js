module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  usage: 'reload [command]',
  execute(message, args) {
    if (!args.length) return message.channel.send(`You didn't pass a command to reload, ${message.author}.`);
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)
      || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Successfully reloaded \ ${commandName}`);
    } catch (error) {
      console.error(error);
      message.channel.send(`There was an error reloading a command \`${command.name}\`:\n\`${error.message}\``);
    }
  }
}
