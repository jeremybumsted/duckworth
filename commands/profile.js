const Discord = require('discord.js');
const db = require('./tools/mongotools.js')

module.exports = {
  name: 'profile',
  tag: 'rpg',
  description: 'Get your DD character profile',
  usage: "d!profile",
  execute(message, args) {
    console.log(message.author)
    const i = db.getPlayerId(message.author.id).then(id => {
      console.log("Let's check for a profile " + id)
      if(id === "noprofile") {
        message.channel.send("Looks like you haven't created a profile yet. You can create one using `d!signup`")
      } else {
        let avatarUri = "https://cdn.discordapp.com/avatars/"
        let avatarPath = `${id[0]["playerId"]}/${id[0]["avatar"]}.gif?size=128`

        const profile = { //Profile information collected from database.
          name: `${id[0]["name"]}`, // Name from user profile
          job: `${id[0]["character"]["job"]}`, // Job from user profile
          hp: `${id[0]["stats"]["hp"]}`, // Current HP from user profile
          mp: `${id[0]["stats"]["mp"]}`, // Current MP from user profile
          //Stat block
          str: `${id[0]["stats"]["str"]}`,
          dex: `${id[0]["stats"]["dex"]}`,
          vit: `${id[0]["stats"]["vit"]}`,
          int: `${id[0]["stats"]["int"]}`,
          //Character information
          baseLevel: `${id[0]["character"]["baselvl"]}`,
          jobLevel: `${id[0]["character"]["jlvl"]}`,
          baseXp: `${id[0]["character"]["xp"]}`,
          jobXp: `${id[0]["character"]["jxp"]}`,
        }

        const embed = new Discord.MessageEmbed()
        .setColor('#5b6ee1')
        .setTitle(profile.name)
        .setDescription(`**${profile.job}**\n**HP:** ${profile.hp} **MP:** ${profile.mp}`)
        .setThumbnail(avatarUri + avatarPath)
        .addField('STATS',`STR: ${profile.str}\nDEX: ${profile.dex}\nVIT: ${profile.vit}\nINT: ${profile.int}`,true)
        .addField('CHARACTER',`Level: ${profile.baseLevel}\nJob Level: ${profile.jobLevel}\nXP: ${profile.baseXp}\nJob XP: ${profile.jobXp}\n`,true)
        message.channel.send(embed)
      }
    }).catch(err => console.error(err))
  }
}
