module.exports = player => {
  let playerInfo = mp.low.getPlayerData({ sid: player.sid })

  player.call('alert', [{text: 'You died!', icon: 'fa-bomb', type: 'error'}])

  setTimeout(() => {
    player.spawn(playerInfo.spawn || mp.config.undefined.defaultSpawn)
    player.health = 100
  }, 5000)
}
