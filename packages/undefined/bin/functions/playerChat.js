module.exports = (player, msg) => {
  if (!/^eval /.test(msg)) {
    mp.players.broadcast(`!{Grey}${player.name}: !{White}${msg}`)
  } else {
    let [, evalMsg] = msg.match(/^eval (.+)/)
    eval(evalMsg)
  }
}
