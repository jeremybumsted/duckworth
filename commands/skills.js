const Discord = require('discord.js');
const db = require('./tools/mongotools.js')
const jobs = require('./assets/jobs.json')


module.exports = {
  name: 'skills',
  description: 'Manage your skills, including equipping secondary skills, passives, and reactions skills.',
  usage: "`d!skills` [view/equip]",
  execute(message, args) {
    async function skills() {
      const id = await db.getPlayerId(message.author.id).then(id => {
        if(id == 'noprofile') {
          message.channel.send("You haven't signed up yet, sign up so you can start your adventure!")
        } else {
          return id
          }
        }).catch(err => console.log(err))
      console.log(id)
      if(!args.length || args == 'view') {
        message.channel.send("you'll see your skills here.")
      } else if (args == 'equip'){
        var embed = new Discord.MessageEmbed()
        .setColor('#5b6ee1')
        .setTitle(`Equip Skills for ${id[0]["name"]}`)
        .setDescription('Use this menu to manage your equipped skills')
        .addField(`:one: Manage Secondary Skills`, `manage secondary skills from classes you have unlocked`)
        .addField(`:two: Manage Reaction Skills`, `manage reaction skills from those you have unlocked`)
        message.channel.send(embed)
      } else {
        message.channel.send("Invalid options. Use `d!skills` [view/equip]")
      }
    }
  skills()



  }//end of execute
}
