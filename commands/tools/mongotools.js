const connectionString = "mongodb+srv://jbumsted:ZioHGJCL2b8F7L0t@cluster0.ukfve.mongodb.net/duckworth?retryWrites=true&w=majority"
const connectionOptions = "{ useNewUrlParser: true }"
const mongoist = require('mongoist')
const db = mongoist(connectionString, connectionOptions)
const playerTemplate = require('./playerTemplate.json')
const {basereq, jobreq} = require('./xptable.json')
const _ = require('lodash')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function getPlayerId(user) { // get playerId object so that we can do stuff with the object later.
  return username = await db.player.find({"playerId": user}).then(result =>{
    sleep(1000)
    if(result.length) {
      console.log(result)
      return result
    }
    else {
      result = "noprofile"
      return result
      }
  }).catch(err => console.error(err))
}

async function getMob(dungeon) {
  mobName = await db.mob.find({"dungeon": dungeon}).then(result => {
    mobName = _.sample(result)
    mobName = mobName.name
    return mobName
  }).catch(err => console.log(err))
  console.log("mobName is " + mobName)
  mob = await db.mob.find({"name": mobName}).then(mob => {
    //sleep(4000)
    return mob
  }).catch(err => console.log(err))
  return mob
}

async function xpUpdate(player, xp) {
  player[0]["character"]["xp"] += xp
  player[0]["character"]["jxp"] += xp
  if(player[0]["character"]["xp"] >= player[0]["character"]["xptolevel"]){
    player[0]["character"]["xp"] -= player[0]["character"]["xptolevel"]
    player[0]["character"]["baselvl"]++
    player[0]["character"]["xptolevel"] = basereq[player[0]["character"]["baselvl"]]
    }
  if(player[0]["character"]["jxp"] >= player[0]["character"]["jxptolevel"]){
    player[0]["character"]["jxp"] -= player[0]["character"]["jxptolevel"]
    player[0]["character"]["jlvl"]++
    player[0]["character"]["jxptolevel"] = jobreq[player[0]["character"]["jlvl"]]
  }
  id = player[0]["playerId"]
  sleep(2000)
  await db.player.replaceOne({"playerId": id}, player[0]).catch(error => {
    console.log(error)
  })
}

async function rewardUpdate(id, reward) {
if (reward === "gold") {
  reward = Math.round(((Math.random() * 10) + (2 * id[0]["character"]["baselvl"])))
  gold = id[0]["character"]["gold"] + reward
  await db.player.update(
    {'playerId': id[0]['playerId']},
    {$set: {'character.gold': gold}}
    ).then(result => {
    sleep(2000)
    console.log(result)
    }).catch(error => {console.log(error)})
} else {
  const i = await db.items.find({"name": reward}).then(result => {
    console.log(result)
    return result
    }).catch(err => {
      console.log(err)
      })//get item information(category, etc)
  var category = `inventory.${i[0]["category"]}`
  if (await db.player.find({[category]: reward})) {//item already exists in players inventory
    item = `inventory.${i[0]["category"]}.${reward}`
    await db.player.update(
      {'playerId': id[0]['playerId']},
      {$inc: {[item]: 1}}
    ).then(result => {console.log(result)}).catch(err => console.log(err))
  } else {
    await db.player.update(
        { 'playerId': id[0]['playerId'] },
        { $set: {[category]: { [reward]: 1 } } },
        { upsert: true }
      ).then(result => {console.log(result)}).catch(err => console.log(err))
    }
  }
}



async function createPlayer(user) { //check for existing IDs, and create a new player object if none exist.
  const id = await getPlayerId(user.id)
  await sleep(2000)
    if(id === "noprofile") {
      playerTemplate["name"] = user.username
      playerTemplate["avatar"] = user.avatar
      playerTemplate["playerId"] = user.id
      const result = await db.player.insertOne(playerTemplate).then(result =>{
        console.log(result)
        return result
        })
      } else {
      console.log("A profile already exists")
      result = "hasprofile"
      return result
        }
}

module.exports = {
  getPlayerId,
  getMob,
  createPlayer,
  sleep,
  xpUpdate,
  rewardUpdate
}
