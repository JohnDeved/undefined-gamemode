module.exports = (player) => {
  if (player.vehicle) {
    let carShopInfo = {}
    carShopInfo.pos = player.vehicle.position
    carShopInfo.rot = player.vehicle.rotation
    carShopInfo.id = mp.loki.generateId(5)
    carShopInfo.model = player.vehicle.model

    mp.loki.shopCars.insert(carShopInfo)
    player.call('alert', [{text: `Shop Car [id:${carShopInfo.id}, model:${carShopInfo.model}] has been saved here!`, icon: 'fa-car', type: 'success'}])
  } else {
    player.call('alert', [{text: `You have to be in a Vehicle to do that!`, type: 'error'}])
  }
}
