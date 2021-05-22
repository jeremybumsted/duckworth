const Discord = require('discord.js');
const db = require('./tools/mongotools.js')

module.exports = {
  name: 'profile',
  description: 'Get your DD character profile',
  usage: "d!profile",
  execute(message, args) {
    console.log(message.author)
    const i = db.getPlayerId(message.author.id).then(id => {
      console.log("Let's check for a profile " + id)
      if(id === "noprofile") {
        console.log("no matching Id")
        message.channel.send("Looks like you haven't created a profile yet. You can create one using `d!signup`")
      } else {
        console.log("sending profile")
        const embed = new Discord.MessageEmbed()
        .setColor('#5b6ee1')
        .setTitle(id[0]["name"])
        .setDescription(`**${id[0]["character"]["job"]}**\n**HP:** ${id[0]["stats"]["hp"]} **MP:** ${id[0]["stats"]["mp"]}`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${id[0]["playerid"]}/${id[0]["avatar"]}.gif`)
        .addField('STATS',`STR: ${id[0]["stats"]["str"]}\nDEX: ${id[0]["stats"]["dex"]}\nVIT: ${id[0]["stats"]["vit"]}\nINT: ${id[0]["stats"]["int"]}`,true)
        .addField('CHARACTER',`Level: ${id[0]["character"]["baselvl"]}\nJob Level: ${id[0]["character"]["jlvl"]}\nXP: ${id[0]["character"]["xp"]}\nJob XP: ${id[0]["character"]["jxp"]}\n`,true)
        message.channel.send(embed)
      }
    }).catch(err => console.error(err))
  }
}
