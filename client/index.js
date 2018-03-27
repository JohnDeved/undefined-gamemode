mp.fnc = require('./js/functions.js')
require('./js/keys')()
require('./js/events')()

const vehicleInfo = require('../packages/undefined/json/vehicleInfo.nolist.json')
mp.vehicleInfo = {}
for (let car in vehicleInfo) {
  let carInfo = vehicleInfo[car]
  mp.vehicleInfo[vehicleInfo[car].hash] = carInfo
}

setInterval(mp.fnc.interval, 50)

if (mp.gui.cursor.visible) {
  mp.gui.cursor.show(false, false)
}
mp.game.graphics.transitionFromBlurred(100)
