module.exports = player => {
  if (player.vehicle) {
    if (player.vehicle.owner === player.uid) {
      player.vehicle.engine = !player.vehicle.engine
    } else {
      const name = mp.vehicleInfo[player.vehicle.model].displayName
      player.call('alert', [{text: `You dont have the keys for this ${name}!`, icon: 'fa-key', type: 'error'}])
    }
  }
}
