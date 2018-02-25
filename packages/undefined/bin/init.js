module.exports = () => {
  mp.vehicleInfo = require('../json/vehicleInfo.nolist.json')
  mp.shopCars = mp.low.getAllShopCars()
  mp.ActiveShopCars = []

  mp.shopCars.forEach(car => {
    let veh = mp.vehicles.new(car.model, car.pos)
    veh.setColor(111, 0)
    veh.rotation = car.rot
    veh.shopId = car.id
    mp.ActiveShopCars.push(veh)
  })
}
