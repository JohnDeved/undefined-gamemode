module.exports = player => {
  if (player.vehicle) {
    if (player.vehicle.shopId) {
      if (player.seat === -1) {
        const carInfo = mp.vehicleInfo[player.vehicle.model]
        let canAfford = mp.fnc.payMoney(player, carInfo.price)
        if (canAfford) {
          delete mp.activeShopCars[player.vehicle.shopId]
          delete player.vehicle.shopId
          player.vehicle.setVariable('shopId', null)
          mp.players.call('freeze', [player.vehicle, false])

          player.vehicle.owner = player.uid
          player.vehicle.setVariable('owner', player.uid)
          player.call(player.call('alert', [{text: `You successfully bought this ${carInfo.displayName}!`, icon: 'fa-key', type: 'success'}]))
        } else {
          player.call(player.call('alert', [{text: `Sorry, you cant afford that!`, icon: 'fa-key', type: 'error'}]))
          mp.fnc.cancelCarShop(player)
        }
      }
    }
  }
}
