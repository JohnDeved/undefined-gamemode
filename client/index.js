const pushRoute = route => {
  if (!mp.gui.cursor.visible) {
    mp.game.graphics.transitionToBlurred(100)
    mp.browser.execute(`vue.$router.push('${route}')`)
    mp.gui.cursor.show(true, true)
    mp.browser.route = route
  } else {
    if (mp.browser.route !== route) { return }
    mp.game.graphics.transitionFromBlurred(100)
    mp.browser.execute(`vue.$router.push('/')`)
    mp.gui.cursor.show(false, false)
    mp.browser.route = '/'
  }
}

mp.events.add('loadUi', sid => {
  mp.players.local.sid = sid
  mp.gui.chat.push('playerObj sid: !{Green}' + mp.players.local.sid)
  mp.browser = mp.browsers.new('http://{{host}}:{{express}}/' + mp.players.local.sid)
  mp.browser.route = '/'
})

mp.events.add('showDialog', dialog => {
  class Dialog {
    constructor () {
      this.title = dialog.title || 'example'
      this.text = dialog.text || 'example text'
      this.yes = dialog.yes || 'ok'
      this.no = dialog.no || 'cancel'
      this.yesCallback = dialog.yesCallback || ''
      this.noCallback = dialog.noCallback || ''
    }
  }
  mp.browser.execute(`dialog = ${JSON.stringify(new Dialog(dialog))}`)
  pushRoute('/dialog')
})

mp.events.add('dialogResponse', callback => {
  pushRoute('/dialog')
  mp.events.callRemote(callback)
})

mp.events.add('freeze', (entity, val) => {
  entity.freezePosition(val)
})

mp.events.add('callRemote', event => {
  mp.events.callRemote(event)
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
mp.keys.bind(85, true, () => mp.events.callRemote('unlockCar'))

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

if (mp.gui.cursor.visible) {
  mp.gui.cursor.show(false, false)
}
mp.game.graphics.transitionFromBlurred(100)
