module.exports = (player, gun = 'weapon_carbinerifle') => {
  player.giveWeapon(mp.joaat(gun), 1000)
  player.call('alert', [{text: `Weapon ${gun} has been spawned!`, icon: 'fa-bomb', type: 'success'}])
}
