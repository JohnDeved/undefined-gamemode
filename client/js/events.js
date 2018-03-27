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

  class ScaleForm {
    constructor (scaleformStr) {
      this._handle = mp.game.graphics.requestScaleformMovie(scaleformStr)
      this.queueCallFunction = new Map()
    }

    get isLoaded () {
      return !!mp.game.graphics.hasScaleformMovieLoaded(this._handle)
    }

    get isValid () {
      return this._handle !== 0
    }

    get handle () {
      return this._handle
    }

    callFunction (strFunction, ...args) {
      if (this.isLoaded && this.isValid) {
        const graphics = mp.game.graphics
        graphics.pushScaleformMovieFunction(this._handle, strFunction)
        args.forEach(arg => {
          switch (typeof arg) {
            case 'string': {
              graphics.pushScaleformMovieFunctionParameterString(arg)
              break
            }
            case 'boolean': {
              graphics.pushScaleformMovieFunctionParameterBool(arg)
              break
            }
            case 'number': {
              if (Number(arg) === arg && arg % 1 !== 0) {
                graphics.pushScaleformMovieFunctionParameterFloat(arg)
              } else {
                graphics.pushScaleformMovieFunctionParameterInt(arg)
              }
            }
          }
        })
        graphics.popScaleformMovieFunctionVoid()
      } else {
        this.queueCallFunction.set(strFunction, args)
      }
    }

    onUpdate () {
      if (this.isLoaded && this.isValid) {
        this.queueCallFunction.forEach((args, strFunction) => {
          this.callFunction(strFunction, ...args)
          this.queueCallFunction.delete(strFunction)
        })
      }
    }

    render2D (x, y, width, height) {
      this.onUpdate()
      if (this.isLoaded && this.isValid) {
        const graphics = mp.game.graphics
        if (typeof x !== 'undefined' && typeof y !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined') {
          // const activeResolution = graphics.getScreenActiveResolution(0, 0)

          graphics.drawScaleformMovie(this._handle, x, y, width, height, 255, 255, 255, 255, 0)
        } else {
          graphics.drawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, false)
        }
      }
    }

    render3D (position, rotation, scale) {
      this.onUpdate()
      if (this.isLoaded && this.isValid) {
        mp.game.graphics.drawScaleformMovie3dNonAdditive(this._handle, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 2, 2, 1, scale.x, scale.y, scale.z, 2)
      }
    }

    render3DAdditive (position, rotation, scale) {
      this.onUpdate()
      if (this.isLoaded && this.isValid) {
        mp.game.graphics.drawScaleformMovie3d(this._handle, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, 2, 2, 1, scale.x, scale.y, scale.z, 2)
      }
    }
  }

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

            /*
              -- undocumented 3d marker icons --
              32: question mark
              33: plane
              34: helicopter
              35: boat
              36: (sports)car
              37: motorcycle
              38: bike
              39: truck
              40: parachute
              41: jetpack
              42: portal
            */

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

            if (obj.scaleForm) {
              let doorPos3d = obj.getWorldPositionOfBone(obj.getBoneIndexByName('handle_dside_f'))
              let rot = obj.getRotation(0)
              // rot.z -= 90
              obj.scaleForm.render3D(doorPos3d, rot, new mp.Vector3(6, 3, 1))
            } else {
              obj.scaleForm = new ScaleForm('player_name_01')
              obj.scaleForm.callFunction('SET_PLAYER_NAME', `Doorhandle =>                             -`)
            }

            if (mp.vehicleInfo) {
              if (mp.vehicleInfo[obj.model]) {
                let bones = mp.vehicleInfo[obj.model].bones
                for (let bone in bones) {
                  let bonePos3d = obj.getWorldPositionOfBone(obj.getBoneIndexByName(bone))
                  mp.game.graphics.drawMarker(28, // sphere
                    bonePos3d.x, bonePos3d.y, bonePos3d.z,
                    0, 0, 0,
                    0, 0, 0,
                    0.1, 0.1, 0.1,
                    154, 217, 61, (0xff * 0.8) * distPerc,
                    false, false, 0, true, '', '', false)
                }
              }
            }
          }
        }
      }
    })
  })
}
