module.exports = (player, vehClass = 4) => {
  if (player.vehicle) {
    let shopCarInfo = {}
    shopCarInfo.pos = player.vehicle.position
    shopCarInfo.rot = player.vehicle.rotation
    shopCarInfo.id = mp.low.generateId(5)
    shopCarInfo.class = vehClass

    mp.low.pushShopCarData(shopCarInfo, () => {
      player.call('alert', [{text: `Shop Car [id:${shopCarInfo.id}, Class: ${shopCarInfo.class}] has been saved here!`, icon: 'fa-car', type: 'success'}])
    })
  } else {
    player.call('alert', [{text: `You have to be in a Vehicle to do that!`, type: 'error'}])
  }
}
