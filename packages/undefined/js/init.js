module.exports = () => {
  mp.vehicleInfo = {}
  let vehicleInfo = require('../json/vehicleInfo.nolist.json')
  for (let car in vehicleInfo) {
    let carInfo = vehicleInfo[car]
    carInfo.price = Math.round(carInfo.maxSpeed) * 1200
    mp.vehicleInfo[vehicleInfo[car].hash] = carInfo
  }

  mp.fnc.refreshCarShop()
}
