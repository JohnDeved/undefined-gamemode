module.exports = () => {
  mp.vehicleInfo = require('../json/vehicleInfo.nolist.json')
  mp.shopCars = mp.low.getAllShopCars()
  mp.ActiveShopCars = []

  mp.shopCars.forEach(car => {
    let veh = mp.vehicles.new(mp.joaat('Dominator'), car.pos)
    veh.rotation = car.rot
    veh.movable = false
    veh.shopId = car.id
    mp.ActiveShopCars.push(veh)
  })
}
