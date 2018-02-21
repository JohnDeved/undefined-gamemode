const crypto = require('crypto')
const base64url = require('base64url')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync(`${__dirname}/db.json`)
// const levelup = require('levelup')
// const leveldown = require('leveldown')
// const leveldb = levelup(leveldown('./db'))
const express = require('express')
const logger = require('morgan')
const app = express()

low(adapter).then(db => {
  db.defaults({ players: [] }).write()

  mp.events.addCommand('car', (player, car = 'Dominator') => {
    let veh = mp.vehicles.new(mp.joaat(car), player.position)
    if (veh) {
      player.call('alert', [{text: `Vehicle ${car} has been spawned!`, icon: 'fa-car', type: 'success'}])
      player.putIntoVehicle(veh, -1)
    } else {
      player.call('alert', [{text: `Couldnt spawn "${car}"!`, icon: 'fa-car', type: 'error'}])
    }
  })

  mp.events.addCommand('gun', (player, gun = 'weapon_carbinerifle') => {
    player.giveWeapon(mp.joaat(gun), 1000)
    player.call('alert', [{text: `Weapon ${gun} has been spawned!`, icon: 'fa-bomb', type: 'success'}])
  })

  mp.events.addCommand('kill', player => {
    player.health = 0
  })

  mp.events.addCommand('setSpawn', player => {
    let playerInfo = db.get('players').find({ sid: player.sid }).value()
    playerInfo.spawn = player.position

    db.get('players').find({ sid: player.sid }).set(playerInfo).write().then(() => {
      player.call('alert', [{text: 'Your spawn has been set here!', icon: 'save', type: 'success'}])
    })
  })

  mp.events.add('playerDeath', player => {
    let playerInfo = db.get('players').find({ sid: player.sid }).value()

    player.call('alert', [{text: 'You died!', icon: 'fa-bomb', type: 'error'}])

    setTimeout(() => {
      player.spawn(playerInfo.spawn || { x: 51.99728012084961, y: -49.256221771240234, z: 69.3716049194336 })
      player.health = 100
    }, 5000)
  })

  mp.events.add('playerReady', player => {
    let playerInfo = db.get('players').find({ scid: player.socialClub }).value()

    if (playerInfo) {
      playerInfo.sid = base64url(crypto.randomBytes(32))
      playerInfo.lastName = player.name
      playerInfo.lastIp = player.ip

      db.get('players').find({ scid: player.socialClub }).set(playerInfo).write().then(() => {
        player.sid = playerInfo.sid
        player.call('loadUi', [playerInfo.sid])
        setTimeout(() => player.call('alert', [{text: `Welcome back ${playerInfo.name}!`}]), 3000)
      })
    } else {
      let uid = base64url(crypto.randomBytes(32))
      let sid = base64url(crypto.randomBytes(32))

      db.get('players').push({
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

  app.use(logger('dev'))
  app.use(express.static(`${__dirname}/public`))
  app.get('/:sid', (req, res) => {
    let playerInfo = db.get('players').find({ sid: req.params.sid }).value()
    if (playerInfo) {
      res.sendFile(`${__dirname}/views/ui.html`)
    }
  })

  app.listen(mp.config.express)
})
