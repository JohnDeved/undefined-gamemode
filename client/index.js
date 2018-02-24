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

mp.events.add('freeze', (entity, val) => {
  entity.freezePosition(val)
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

setInterval(() => {
  if (mp.browser) {
    if (mp.players.local.vehicle) {
      let speed = mp.players.local.vehicle.getSpeed() * 3.6
      mp.browser.execute(`vue.speed = ${Math.floor(speed)}`)
      mp.browser.execute(`speedometer.value = ${speed}`)
      mp.browser.execute(`vue.isDriving = true`)
    } else {
      mp.browser.execute(`vue.isDriving = false`)
    }
  }
}, 50)
