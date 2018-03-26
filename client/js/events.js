module.exports = () => {
  mp.events.add('loadUi', playerInfo => {
    mp.players.local.sid = playerInfo.sid
    mp.players.local.uid = playerInfo.uid
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

  mp.events.add('browserExec', str => {
    mp.browser.execute(str)
  })

  mp.events.add('server_spawnCar', car => {
    mp.events.callRemote('spawnCar', car)
  })

  mp.events.add('render', () => {
    mp.vehicles.forEachInStreamRange(obj => {
      let posp = mp.players.local.position
      let pos3d = obj.position
      let dist = mp.game.system.vdist(posp.x, posp.y, posp.z, pos3d.x, pos3d.y, pos3d.z)
      let drawDist = 25
      if (dist < drawDist) {
        if (pos3d) {
          let dimentions = mp.game.gameplay.getModelDimensions(obj.model)
          pos3d.z += dimentions.max.z + 0.5
          let pos2d = mp.game.graphics.world3dToScreen2d(pos3d)
          if (pos2d) {
            let distPerc = (1 - (dist / drawDist))

            // let format = {
            //   font: 4,
            //   color: [0xff, 0xff, 0xff, distPerc * 0xff],
            //   scale: [(distPerc + 0.6) * 0.5, (distPerc + 0.6) * 0.5],
            //   outline: true
            // }
            // let text = `x: ${pos3d.x.toFixed(2)}; y: ${pos3d.y.toFixed(2)}; z: ${pos3d.z.toFixed(2)};`

            // mp.game.graphics.drawText(text, [pos2d.x, pos2d.y], format)
            // mp.game.graphics.drawText(`${dist}`, [pos2d.x, pos2d.y], format)

            if (obj.getVariable('shopId')) {
              mp.game.graphics.drawMarker(29, // cash
                pos3d.x, pos3d.y, pos3d.z,
                0, 0, 0,
                0, 0, 0,
                1, 1, 1,
                154, 217, 61, (0xff * 0.8) * distPerc,
                false, false, 0, true, '', '', false)
            }

            if (obj.getVariable('owner') === mp.players.local.uid && !mp.players.local.vehicle) {
              mp.game.graphics.drawMarker(36, // car
                pos3d.x, pos3d.y, pos3d.z,
                0, 0, 0,
                0, 0, 0,
                1, 1, 1,
                0xff, 0xff, 0xff, (0xff * 0.8) * distPerc,
                false, false, 0, true, '', '', false)
            }
          }
        }
      }
    })
  })
}
