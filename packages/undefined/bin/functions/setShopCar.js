module.exports = (player) => {
  if (player.vehicle) {
    let shopCarInfo = {}
    shopCarInfo.pos = player.vehicle.position
    shopCarInfo.rot = player.vehicle.rotation
    shopCarInfo.id = mp.low.generateId(5)
    shopCarInfo.model = player.vehicle.model

    mp.low.pushShopCarData(shopCarInfo, () => {
      player.call('alert', [{text: `Shop Car [id:${shopCarInfo.id}, model:${shopCarInfo.model}] has been saved here!`, icon: 'fa-car', type: 'success'}])
    })
  } else {
    player.call('alert', [{text: `You have to be in a Vehicle to do that!`, type: 'error'}])
  }
}
