module.exports = (player, amount) => {
  let playerInfo = mp.loki.players.findOne({ uid: player.uid })
  playerInfo.cash = parseInt(amount)
  mp.loki.players.update(playerInfo)
  player.call('browserExec', [`vue.cash = ${playerInfo.cash}`])
}
