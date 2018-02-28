module.exports = player => {
  if (!mp.activeShopCars) {
    mp.activeShopCars = {}
  }

  mp.shopCars = mp.loki.shopCars.data
  mp.shopCars.forEach(car => {
    if (!mp.activeShopCars[car.id]) {
      let veh = mp.vehicles.new(car.model, car.pos)
      veh.setColor(111, 111)
      veh.rotation = car.rot
      veh.shopId = car.id
      mp.activeShopCars[car.id] = veh
      setTimeout(() => {
        mp.players.call('freeze', [veh, true])
      }, 1000)
    }
  })

  player && player.call('alert', [{text: `Car shops have been refreshed`, type: 'success'}])
}
