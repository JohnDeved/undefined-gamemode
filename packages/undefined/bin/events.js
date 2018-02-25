module.exports = () => {
  mp.events.add('spawnCar', mp.fnc.spawnCar)
  mp.events.add('playerDeath', mp.fnc.playerDeath)
  mp.events.add('playerReady', mp.fnc.playerReady)
  mp.events.add('playerChat', mp.fnc.playerChat)
  mp.events.add('playerEnterVehicle', mp.fnc.playerEnterVehicle)
  mp.events.add('playerExitVehicle', mp.fnc.playerExitVehicle)
  mp.events.add('playerStartExitVehicle', mp.fnc.playerStartExitVehicle)
  mp.events.add('playerStartEnterVehicle', mp.fnc.playerStartEnterVehicle)
  mp.events.add('buyCarShop', mp.fnc.buyCarShop)
  mp.events.add('destroyCar', mp.fnc.destroyCar)

  mp.events.addCommand('car', mp.fnc.spawnCar)
  mp.events.addCommand('setCarShop', mp.fnc.setCarShop)
  mp.events.addCommand('refreshCarShop', mp.fnc.refreshCarShop)
  mp.events.addCommand('gun', mp.fnc.spawnGun)
  mp.events.addCommand('kill', player => { player.health = 0 })
  mp.events.addCommand('setSpawn', mp.fnc.setSpawn)
}
