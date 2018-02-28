module.exports = (player, amount) => {
  amount = parseInt(amount)
  let playerInfo = mp.loki.players.findOne({ uid: player.uid })
  let newCash = playerInfo.cash || 0
  newCash += amount
  playerInfo.cash = newCash
  mp.loki.players.update(playerInfo)
  player.call('browserExec', [`vue.cash = ${playerInfo.cash}`])
  player.call('alert', [{text: `You received $${amount.toLocaleString('en-EN')}!`, icon: 'fa-dollar-sign', type: 'info', color: 'success'}])
}
