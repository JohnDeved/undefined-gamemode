module.exports = player => {
  const unlock = veh => {
    if (veh.locked) {
      veh.locked = false
      const name = mp.vehicleInfo[veh.model].displayName
      player.call('alert', [{text: `You unlocked your ${name}!`, icon: 'fa-key', type: 'info'}])
    } else {
      veh.locked = true
      const name = mp.vehicleInfo[veh.model].displayName
      player.call('alert', [{text: `You locked your ${name}!`, icon: 'fa-key', type: 'info', color: 'orange'}])
    }
  }

  if (player.vehicle) {
    if (player.vehicle.owner === player.uid) {
      unlock(player.vehicle)
    } else {
      const name = mp.vehicleInfo[player.vehicle.model].displayName
      player.call('alert', [{text: `You dont have the keys for this ${name}!`, icon: 'fa-key', type: 'error'}])
    }
  } else {
    mp.vehicles.forEachInRange(player.position, 5, vehicle => {
      if (vehicle.owner === player.uid) {
        unlock(vehicle)
      }
    })
  }
}
