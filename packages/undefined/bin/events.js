module.exports = () => {
  mp.events.add('spawnCar', mp.fnc.spawnCar)
  mp.events.add('playerDeath', mp.fnc.playerDeath)
  mp.events.add('playerReady', mp.fnc.playerReady)
  mp.events.add('playerChat', mp.fnc.playerChat)

  mp.events.addCommand('car', mp.fnc.spawnCar)
  mp.events.addCommand('setShopCar', mp.fnc.setShopCar)
  mp.events.addCommand('gun', mp.fnc.spawnGun)
  mp.events.addCommand('kill', player => { player.health = 0 })
  mp.events.addCommand('setSpawn', mp.fnc.setSpawn)
}
