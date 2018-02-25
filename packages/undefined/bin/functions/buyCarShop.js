module.exports = player => {
  if (player.vehicle) {
    if (player.vehicle.shopId) {
      delete mp.activeShopCars[player.vehicle.shopId]
      delete player.vehicle.shopId
      mp.players.call('freeze', [player.vehicle, false])

      player.vehicle.owner = player.uid
      const name = mp.vehicleInfo[player.vehicle.model].displayName
      player.call(player.call('alert', [{text: `You successfully bought this ${name}!`, icon: 'fa-key', type: 'success'}]))
    }
  }
}
