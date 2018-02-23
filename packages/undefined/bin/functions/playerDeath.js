module.exports = player => {
  let playerInfo = mp.low.getPlayerData({ sid: player.sid })

  player.call('alert', [{text: 'You died!', icon: 'fa-bomb', type: 'error'}])

  setTimeout(() => {
    player.spawn(playerInfo.spawn || { x: 51.99728012084961, y: -49.256221771240234, z: 69.3716049194336 })
    player.health = 100
  }, 5000)
}
