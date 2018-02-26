module.exports = player => {
  if (player.vehicle) {
    if (player.vehicle.shopId) {
      let vehId = player.vehicle.shopId
      mp.low.removeShopCarData({id: vehId})
      delete mp.activeShopCars[vehId]
      delete player.vehicle.shopId
      player.vehicle.destroy()
      return player.call('alert', [{text: `Deleted Shop Car ${vehId}`, type: 'success'}])
    }
  }
  player.call('alert', [{text: `You need to be in a Shop Car to do that!`, type: 'error'}])
}
