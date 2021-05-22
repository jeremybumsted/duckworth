//Combat related methods happen here

function resolveMobDamage(calc, playerDef, mobAtk) {
  return mobDamage = Math.round(10 * (calc * (mobAtk / playerDef)))
}


function resolvePlayerDamage(player, mob, action) {//a is player
  const calc = Math.random() * (0.9 - 0.4) + 0.4
  var playerDef = player[0]["stats"]["vit"]
  var playerDamage = ""
  if (action.has('⚔️')) {
    playerDamage = Math.round(10 * (calc * (player[0]["stats"]["str"] / mob[0]["stats"]["def"])))
    console.log("Player Damage = " + playerDamage)
  } else if (action.has('🛡️')) {
    playerDef = player[0]["stats"]["vit"] * 1.4
    console.log("player defense = " + playerDef)
  } else {
    console.log("Something went wrong")
  }
  const mobDamage = resolveMobDamage(calc, playerDef, mob[0]["stats"]["atk"])
  console.log(playerDamage + mobDamage)
  return finalDamage = {
    "playerDamage": playerDamage,
    "mobDamage": mobDamage
    }
  }

module.exports = {
  resolvePlayerDamage
}
