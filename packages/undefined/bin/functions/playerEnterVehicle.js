module.exports = (player, vehicle, seat) => {
  if (vehicle.shopId) {
    // const name = mp.vehicleInfo[vehicle.model].displayName
    const dialog = {
      title: 'Example Car Shop',
      text: `Do you wanna Buy this ${vehicle.model}?<br>[ShopId: ${vehicle.shopId}]`,
      yes: 'yes ($30,000)',
      no: 'cancel'
    }
    player.call('showDialog', [dialog])
    vehicle.locked = true
  }
}
