module.exports = (player, price) => {
  let playerInfo = mp.loki.players.findOne({ uid: player.uid })
  let leftCash = playerInfo.cash - parseInt(price)
  if (leftCash < 0) {
    return false
  } else {
    playerInfo.cash = leftCash
    mp.loki.players.update(playerInfo)
    player.call('browserExec', [`vue.cash = ${playerInfo.cash}`])
    return true
  }
}
