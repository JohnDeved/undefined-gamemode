module.exports = new class {
  constructor () {
    this.pushRoute = (route, esc) => {
      if (!mp.gui.cursor.visible && !esc) {
        mp.game.graphics.transitionToBlurred(100)
        mp.browser.execute(`vue.$router.push('${route}')`)
        mp.gui.cursor.show(true, true)
        mp.browser.route = route
      } else {
        if (mp.browser.route !== route && !esc) { return }
        mp.game.graphics.transitionFromBlurred(100)
        mp.browser.execute(`vue.$router.push('/')`)
        mp.gui.cursor.show(false, false)
        mp.browser.route = '/'
      }
    }
    this.log = (...data) => {
      mp.events.callRemote('log', JSON.stringify(data))
    }
    this.interval = () => {
      if (mp.browser) {
        if (mp.players.local.vehicle) {
          let speed = mp.players.local.vehicle.getSpeed() * 3.6
          mp.browser.execute(`speedometer.value = ${speed}`)
          mp.browser.execute(`vue.gear = ${mp.players.local.vehicle.gear}`)
          mp.browser.execute(`vue.rpm = ${mp.players.local.vehicle.rpm}`)
          mp.browser.execute(`vue.isDriving = true`)
        } else {
          mp.browser.execute(`vue.isDriving = false`)
        }
      }
    }
  }
}()
