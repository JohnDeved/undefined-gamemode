module.exports = player => {
  let playerInfo = mp.low.getPlayerData({ scid: player.socialClub })

  if (playerInfo) {
    playerInfo.sid = mp.low.generateId(32)
    playerInfo.lastName = player.name
    playerInfo.lastIp = player.ip

    mp.low.setPlayerData({ uid: player.uid }, playerInfo, () => {
      player.sid = playerInfo.sid
      player.call('loadUi', [playerInfo.sid])
      setTimeout(() => player.call('alert', [{text: `Welcome back ${playerInfo.name}!`}]), 3000)
    })
  } else {
    let uid = mp.low.generateId(32)
    let sid = mp.low.generateId(32)

    mp.low.db.get('players').push({
      uid: uid,
      sid: sid,
      scid: player.socialClub,
      firstName: player.name,
      lastName: player.name,
      firstIp: player.ip,
      lastIp: player.ip
    }).write().then(() => {
      player.sid = playerInfo.sid
      player.call('loadUi', [sid])
    })
  }
}
