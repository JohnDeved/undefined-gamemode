module.exports = player => {
  if (player.vehicle) {
    if (player.vehicle.shopId) {
      const name = mp.vehicleInfo[player.vehicle.model].displayName
      player.call(player.call('alert', [{text: `You successfully bought this ${name}!`, type: 'success'}]))
    }
  }
}
