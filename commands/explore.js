const Discord = require('discord.js');
const db = require('./tools/mongotools.js')
const combat = require('./tools/combat.js')
const _ = require('lodash')

module.exports = {
  name: 'explore',
  tag: 'rpg',
  description: 'Explore the dungeon and battle randomly encountered monsters to get rewards.\n You have 30 seconds per action, not choosing an action will hurt ;)',
  cooldown: 60,
  usage: "`d!explore` [Floor]",
  execute(message, args) {
    const filter = (reaction, user) => {
	    return ['⚔️','🛡️'].includes(reaction.emoji.name) && user.id === message.author.id;
     };

    function createEmbed(mob, mobHp, player, playerHp) {
      var embed = new Discord.MessageEmbed()
      .setColor('#5b6ee1')
      .setTitle(`${player[0]["name"]}'s Exploration`)
      .setDescription(`A ${mob[0]["name"]} has appeared!`)
      .addField(`${mob[0]["name"]}`, `HP:${mobHp}`)
      .addField(`${player[0]["name"]}`,`HP:${playerHp}`)
      return embed
    }

    async function battle(player, playerHp, mob, mobHp, collected) {
      db.sleep(1000)
      var damage = await combat.resolvePlayerDamage(player, mob, collected)
      console.log(damage)
      if (mobHp>=1) {
            mobHp-=damage.playerDamage
            playerHp-=damage.mobDamage
            embed = createEmbed(mob, mobHp, player, playerHp)
            if (mobHp === 0||mobHp <= 0) { //Check for win condition (mobHp is 0)
                const itemReward = _.sample(mob[0]["loot"])
                const xp = mob[0]["stats"]["xp"]
                var embed = new Discord.MessageEmbed()
                  .setColor('#5b6ee1')
                  .setTitle(`${player[0]["name"]}'s Exploration`)
                  .setDescription(`You defeated ${mob[0]["name"]}`)
                  .addField(`REWARDS`, `${itemReward}\nXP: ${mob[0]["stats"]["xp"]}`)
                  await db.xpUpdate(player, xp)
                  await db.rewardUpdate(player, itemReward)
                  message.channel.send(embed)
                } else if(playerHp === 0||playerHp <=0 ) {
                  message.channel.send("Looks like you died :(")
                } else { //If everybody is still alive, continue the loop
                  message.channel.send(embed)
                  .then(message => {
                    message.react('⚔️').then(() => message.react('🛡️'))
                    message.awaitReactions(filter, { max: 1, time: 30000, idle: 30000, errors: ['time']['idle'] })
                      .then(collected => {
                        battle(player, playerHp, mob, mobHp, collected)
                      }).catch(collected => {
                         console.log(`No response received. Event Timed Out`)
                      })
                    })
                }
          } else { //We shouldn't ever hit this point, something up the chain broke if we did
            console.log("something went wrong.. this probably shouldn't have happened")
          }
    }


     async function explore() {
      var player = await db.getPlayerId(message.author.id)
      var mob = await db.getMob("forest")
      db.sleep(1000)
      console.log("This is what I got back: " + mob)
      var mobHp = mob[0]["stats"]["hp"]
      var playerHp = player[0]["stats"]["hp"]
      var embed = createEmbed(mob, mobHp, player, playerHp)
      message.channel.send(embed)
      .then(message => {
        message.react('⚔️').then(() => message.react('🛡️'))
        message.awaitReactions(filter, { max: 1, time: 30000, idle: 30000, errors: ['time']['idle'] })
        .then(collected => {
            battle(player, playerHp, mob, mobHp, collected)
          }).catch(collected => {
             console.log(`No response received. Event Timed Out`)
          })
        })
        }
        explore()
}
}// end of execute
