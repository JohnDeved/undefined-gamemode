module.exports = player => {
  if (!mp.activeShopCars) {
    mp.activeShopCars = []
  }

  mp.shopCars = mp.low.getAllShopCars()
  mp.shopCars.forEach(car => {
    let exists = mp.activeShopCars.find(c => c.shopId === car.id)
    if (!exists) {
      let veh = mp.vehicles.new(car.model, car.pos)
      veh.setColor(111, 0)
      veh.rotation = car.rot
      veh.shopId = car.id
      mp.players.call('freeze', [veh, true])
      mp.players.forEach(p => {
        p.call('freeze', [veh, true])
      })
      mp.activeShopCars.push(veh)
    }
  })

  player && player.call('alert', [{text: `Car shops have been refreshed`, type: 'success'}])
}
