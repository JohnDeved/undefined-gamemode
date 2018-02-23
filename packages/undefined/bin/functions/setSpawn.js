module.exports = player => {
  let playerInfo = mp.low.getPlayerData({ sid: player.sid })
  playerInfo.spawn = player.position

  mp.low.setPlayerData({ sid: player.sid }, playerInfo, () => {
    player.call('alert', [{text: 'Your spawn has been set here!', icon: 'save', type: 'success'}])
  })
}
