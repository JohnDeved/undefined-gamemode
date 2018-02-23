const pushRoute = route => {
  if (!mp.gui.cursor.visible) {
    mp.game.graphics.transitionToBlurred(100)
    mp.browser.execute(`vue.$router.push('${route}')`)
    mp.gui.cursor.show(true, true)
  } else {
    mp.game.graphics.transitionFromBlurred(100)
    mp.browser.execute(`vue.$router.push('/')`)
    mp.gui.cursor.show(false, false)
  }
}

mp.events.add('loadUi', sid => {
  mp.players.local.sid = sid
  mp.gui.chat.push('playerObj sid: !{Green}' + mp.players.local.sid)
  mp.browser = mp.browsers.new('http://{{host}}:{{express}}/' + mp.players.local.sid)
})

mp.events.add('alert', data => {
  mp.browser.execute(`vue.alert(${JSON.stringify(data)})`)
})

mp.events.add('server_spawnCar', car => {
  mp.events.callRemote('spawnCar', car)
})

mp.keys.bind(113, true, () => pushRoute('/buttons'))
mp.keys.bind(114, true, () => pushRoute('/cars'))
mp.keys.bind(116, true, () => mp.browser.reload(false))
