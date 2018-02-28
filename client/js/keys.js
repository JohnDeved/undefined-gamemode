module.exports = () => {
  mp.keys.bind(113, true, () => mp.fnc.pushRoute('/buttons'))
  mp.keys.bind(114, true, () => mp.fnc.pushRoute('/cars'))
  mp.keys.bind(116, true, () => mp.browser.reload(false))
  mp.keys.bind(85, true, () => mp.events.callRemote('unlockCar'))
  mp.keys.bind(27, true, () => mp.fnc.pushRoute('/', true))
  mp.keys.bind(117, true, () => {
    mp.browser.url = 'http://{{host}}:{{express}}/' + mp.players.local.sid
    mp.game.graphics.transitionFromBlurred(100)
    mp.browser.execute(`vue.$router.push('/')`)
    mp.gui.cursor.show(false, false)
    mp.browser.route = '/'
  })
}
