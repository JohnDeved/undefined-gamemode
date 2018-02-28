module.exports = () => {
  mp.events.add({
    'kill': player => { player.health = 0 }
  })

  mp.events.addCommand({
    'car': mp.fnc.spawnCar,
    'gun': mp.fnc.spawnGun,
    'kill': player => { player.health = 0 },
    'heal': mp.fnc.heal,
    'cash': mp.fnc.addMoney
  })
}
