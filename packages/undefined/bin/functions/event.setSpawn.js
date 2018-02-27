module.exports = player => {
  let playerInfo = mp.loki.players.findOne({ sid: player.sid })
  playerInfo.spawn = player.position

  mp.loki.players.update(playerInfo)
  player.call('alert', [{text: 'Your spawn has been set here!', icon: 'save', type: 'success'}])
}
