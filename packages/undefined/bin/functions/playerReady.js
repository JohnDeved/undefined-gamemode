module.exports = player => {
  let playerInfo = mp.loki.players.findOne({ scid: player.socialClub })

  if (playerInfo) {
    playerInfo.sid = mp.loki.generateId(10)
    playerInfo.lastName = player.name
    playerInfo.lastIp = player.ip

    mp.loki.players.update(playerInfo)
    player.sid = playerInfo.sid
    player.uid = playerInfo.uid
    player.call('loadUi', [playerInfo.sid])
    player.spawn(playerInfo.spawn || mp.config.undefined.defaultSpawn)
    setTimeout(() => player.call('alert', [{text: `Welcome back ${player.name}!`}]), 3000)
  } else {
    playerInfo = {uid: mp.loki.generateId(32), sid: mp.loki.generateId(10)}
    playerInfo.scid = player.socialClub
    playerInfo.firstName = player.name
    playerInfo.lastName = player.name
    playerInfo.firstIp = player.ip
    playerInfo.lastIp = player.ip

    mp.loki.players.insert(playerInfo)
    player.sid = playerInfo.sid
    player.uid = playerInfo.uid
    player.call('loadUi', [playerInfo.sid])
    player.spawn(playerInfo.spawn || mp.config.undefined.defaultSpawn)
  }

  setTimeout(() => {
    for (var car in mp.activeShopCars) {
      player.call('freeze', [mp.activeShopCars[car], true])
    }
  }, 1000)
}
