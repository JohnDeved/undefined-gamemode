module.exports = () => {
  mp.events.add({
    'spawnCar': mp.fnc.spawnCar,
    'playerDeath': mp.fnc.playerDeath,
    'playerReady': mp.fnc.playerReady,
    'playerChat': mp.fnc.playerChat,
    'playerEnterVehicle': mp.fnc.playerEnterVehicle,
    'playerExitVehicle': mp.fnc.playerExitVehicle,
    'playerStartExitVehicle': mp.fnc.playerStartExitVehicle,
    'playerStartEnterVehicle': mp.fnc.playerStartEnterVehicle,
    'buyCarShop': mp.fnc.buyCarShop,
    'destroyCar': mp.fnc.destroyCar,
    'unlockCar': mp.fnc.unlockCar,
    'heal': mp.fnc.heal,
    'kill': player => { player.health = 0 },
    'log': mp.fnc.log,
    'setCarShop': mp.fnc.setCarShop,
    'refreshCarShop': mp.fnc.refreshCarShop,
    'removeCarShop': mp.fnc.removeCarShop,
    'setSpawn': mp.fnc.setSpawn,
    'kick': mp.fnc.kick
  })

  mp.events.addCommand({
    'car': mp.fnc.spawnCar,
    'gun': mp.fnc.spawnGun,
    'kill': player => { player.health = 0 },
    'heal': mp.fnc.heal
  })
}
