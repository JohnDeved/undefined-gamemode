const fnc = require('./functions.js')

module.exports = low => {
  mp.events.add('spawnCar', fnc.spawnCar)
  mp.events.addCommand('car', fnc.spawnCar)

  mp.events.addCommand('gun', (player, gun = 'weapon_carbinerifle') => {
    player.giveWeapon(mp.joaat(gun), 1000)
    player.call('alert', [{text: `Weapon ${gun} has been spawned!`, icon: 'fa-bomb', type: 'success'}])
  })

  mp.events.addCommand('kill', player => {
    player.health = 0
  })

  mp.events.addCommand('setSpawn', player => {
    let playerInfo = low.getPlayerData({ sid: player.sid })
    playerInfo.spawn = player.position

    low.setPlayerData({ sid: player.sid }, playerInfo, () => {
      player.call('alert', [{text: 'Your spawn has been set here!', icon: 'save', type: 'success'}])
    })
  })

  mp.events.add('playerDeath', player => {
    let playerInfo = low.getPlayerData({ sid: player.sid })

    player.call('alert', [{text: 'You died!', icon: 'fa-bomb', type: 'error'}])

    setTimeout(() => {
      player.spawn(playerInfo.spawn || { x: 51.99728012084961, y: -49.256221771240234, z: 69.3716049194336 })
      player.health = 100
    }, 5000)
  })

  mp.events.add('playerReady', player => {
    let playerInfo = low.getPlayerData({ scid: player.socialClub })

    if (playerInfo) {
      playerInfo.sid = low.generateId(32)
      playerInfo.lastName = player.name
      playerInfo.lastIp = player.ip

      low.setPlayerData({ uid: player.uid }, playerInfo, () => {
        player.sid = playerInfo.sid
        player.call('loadUi', [playerInfo.sid])
        setTimeout(() => player.call('alert', [{text: `Welcome back ${playerInfo.name}!`}]), 3000)
      })
    } else {
      let uid = low.generateId(32)
      let sid = low.generateId(32)

      low.db.get('players').push({
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
  })

  mp.events.add('playerChat', (player, msg) => {
    if (!/^eval /.test(msg)) {
      mp.players.broadcast(`!{Grey}${player.name}: !{White}${msg}`)
    } else {
      let [, evalMsg] = msg.match(/^eval (.+)/)
      eval(evalMsg)
    }
  })
}
