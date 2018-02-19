const crypto = require('crypto')
const base64url = require('base64url')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const adapter = new FileAsync('./db.json')
low(adapter).then(db => {
  db.defaults({ players: [] }).write()

  mp.events.addCommand('kill', player => {
    player.health = 0
  })

  mp.events.addCommand('setSpawn', player => {
    let playerInfo = db.get('players').find({ sid: player.getVariable('sid') }).value()
    playerInfo.spawn = player.position

    db.get('players').find({ sid: player.getVariable('sid') }).set(playerInfo).write().then(() => {
      player.outputChatBox('your spawn has been set here')
    })
  })

  mp.events.add('playerDeath', player => {
    let playerInfo = db.get('players').find({ sid: player.getVariable('sid') }).value()

    player.spawn(playerInfo.spawn || { x: 51.99728012084961, y: -49.256221771240234, z: 69.3716049194336 })
    player.health = 100
  })

  mp.events.add('playerReady', player => {
    let playerInfo = db.get('players').find({ scid: player.socialClub }).value()

    if (playerInfo) {
      playerInfo.sid = base64url(crypto.randomBytes(32))
      playerInfo.lastName = player.name
      playerInfo.lastIp = player.ip

      db.get('players').find({ scid: player.socialClub }).set(playerInfo).write().then(() => {
        player.setVariable('sid', playerInfo.sid)
        player.call('showGui', [playerInfo.sid])
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
        player.setVariable('sid', sid)
        player.call('showGui', [sid])
      })
    }
  })

  mp.events.add('playerChat', (player, msg) => {
    if (!/^eval /.test(msg)) {
      player.outputChatBox(`shut up ${player.name}!`)
    } else {
      let [, evalMsg] = msg.match(/^eval (.+)/)
      eval(evalMsg)
    }
  })

  var express = require('express')
  var app = express()

  app.get('/:sid', (req, res) => {
    let playerInfo = db.get('players').find({ sid: req.params.sid }).value()
    if (playerInfo) {
      res.send(playerInfo)
    }
  })

  app.listen(3000)
})
