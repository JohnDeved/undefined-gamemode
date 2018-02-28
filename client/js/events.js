module.exports = () => {
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
    mp.fnc.pushRoute('/dialog')
  })

  mp.events.add('dialogResponse', callback => {
    mp.fnc.pushRoute('/dialog')
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
}
