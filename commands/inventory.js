const Discord = require('discord.js');
const db = require('./tools/mongotools.js')

function formatter(id, name) {
  const bag = id[0]["inventory"][name]
  if (Object.keys(bag).length === 0){
    return itemList = "no items."
  }
  var itemList = ""
  for (const [key, value] of Object.entries(bag)) {
    itemList = itemList.concat(`${key}: ${value}\n`)
  }
  return itemList
}


function createEmbed(id, name) {
  itemList = formatter(id, name)
  db.sleep(2000)
    embed = new Discord.MessageEmbed()
    .setColor('#5b6ee1')
    .setTitle(`${id[0]["name"]}'s Inventory`)
    .setDescription(`To view individual tabs, use \`d!inventory [category]\``)
    .addField(`${name}`,`${itemList}`)
    return embed
  }

module.exports = {
  name: 'inventory',
  description: 'Show your inventory by item category (Weapons, Armor, Consumables, Misc). Not specifying a category will show you *all* categories of items, but will not show all items',
  usage:'`d!inventory` [category]',
  execute(message, args) {
    const i = db.getPlayerId(message.author.id).then(id => {
      console.log("Let's check for a profile " + id)
      if(id === "noprofile") {
        console.log("no matching Id")
        message.channel.send("Looks like you haven't created a profile yet. You can create one using `d!signup`")
      } else if (!args.length){
        const embed = new Discord.MessageEmbed()
        .setColor('#5b6ee1')
        .setTitle(`${id[0]["name"]}'s Inventory`)
        .setDescription("To view individual tabs, use `d!inventory [category]`")
        .addField(`Currency`, `**GOLD**: ${id[0]["character"]["gold"]}`)
        .addField(`Consumables`, `${formatter(id, "consumables")}`)
        .addField(`Weapons`, `${formatter(id, "weapons")}`)
        .addField(`Armor`, `${formatter(id, "armor")}`)
        .addField(`Misc`, `${formatter(id, "misc")}`)
        message.channel.send(embed)
      } else {
        const name = args[0].toLowerCase()
        switch(name) {
          case "consumables":
          console.log("getting consumables")
          inven = createEmbed(id, name)
          message.channel.send(inven)
          break
          case "weapons":
          console.log("getting weapons")
          inven = createEmbed(id, name)
          message.channel.send(inven)
          break
          case "armor":
          console.log("getting armor")
          inven = createEmbed(id, name)
          message.channel.send(inven)
          break
          case "misc":
          console.log("getting misc")
          inven = createEmbed(id, name)
          message.channel.send(inven)
          break
          default:
          message.channel.send("Invalid category. Valid categories: `consumables, weapons, armor, misc`")
        }
      }
    })
  }//End of Execute
}//End of module.exports
