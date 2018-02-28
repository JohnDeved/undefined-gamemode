module.exports = (player, amount) => {
  let playerInfo = mp.loki.players.findOne({ uid: player.uid })
  let newCash = playerInfo.cash || 0
  newCash += parseInt(amount)
  playerInfo.cash = newCash
  mp.loki.players.update(playerInfo)
  player.call('browserExec', [`vue.cash = ${playerInfo.cash}`])
  player.call('alert', [{text: `You received $${amount}!`, icon: 'fa-dollar-sign', type: 'info', color: 'success'}])
}
