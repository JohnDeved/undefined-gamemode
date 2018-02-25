module.exports = () => {
  mp.vehicleInfo = {}
  let vehicleInfo = require('../json/vehicleInfo.nolist.json')
  for (let car in vehicleInfo) {
    mp.vehicleInfo[vehicleInfo[car].hash] = vehicleInfo[car]
  }

  mp.fnc.refreshCarShop()
}
