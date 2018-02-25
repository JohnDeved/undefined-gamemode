module.exports = player => {
  let playerInfo = mp.low.getPlayerData({ scid: player.socialClub })

  if (playerInfo) {
    playerInfo.sid = mp.low.generateId(10)
    playerInfo.lastName = player.name
    playerInfo.lastIp = player.ip

    mp.low.setPlayerData({ uid: player.uid }, playerInfo, () => {
      player.sid = playerInfo.sid
      player.call('loadUi', [playerInfo.sid])
      player.spawn(playerInfo.spawn || mp.config.undefined.defaultSpawn)
      setTimeout(() => player.call('alert', [{text: `Welcome back ${playerInfo.name}!`}]), 3000)
    })
  } else {
    playerInfo = {uid: mp.low.generateId(32), sid: mp.low.generateId(10)}
    playerInfo.scid = player.socialClub
    playerInfo.firstName = player.name
    playerInfo.lastName = player.name
    playerInfo.firstIp = player.ip
    playerInfo.lastIp = player.ip

    mp.low.pushPlayerData(playerInfo, () => {
      player.sid = playerInfo.sid
      player.call('loadUi', [playerInfo.sid])
      player.spawn(playerInfo.spawn || mp.config.undefined.defaultSpawn)
    })
  }

  mp.activeShopCars.forEach(car => {
    player.call('freeze', [car, true])
  })
}
