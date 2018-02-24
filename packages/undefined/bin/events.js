const fnc = require('./functions.js')

module.exports = () => {
  mp.events.add('spawnCar', fnc.spawnCar)
  mp.events.add('playerDeath', fnc.playerDeath)
  mp.events.add('playerReady', fnc.playerReady)
  mp.events.add('playerChat', fnc.playerChat)

  mp.events.addCommand('car', fnc.spawnCar)
  mp.events.addCommand('setShopCar', fnc.setShopCar)
  mp.events.addCommand('gun', fnc.spawnGun)
  mp.events.addCommand('kill', player => { player.health = 0 })
  mp.events.addCommand('setSpawn', fnc.setSpawn)
}
