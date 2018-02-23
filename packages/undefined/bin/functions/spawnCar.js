module.exports = (player, car = 'Dominator') => {
  if (player.vehicle) {
    player.vehicle.destroy()
    setTimeout(() => {
      // spawnCar(player, car)
    }, 50)
  } else {
    let veh = mp.vehicles.new(mp.joaat(car), player.position)
    if (veh) {
      player.call('alert', [{text: `Vehicle ${car} has been spawned!`, icon: 'fa-car', type: 'success'}])
      player.putIntoVehicle(veh, -1)
    } else {
      player.call('alert', [{text: `Couldnt spawn "${car}"!`, icon: 'fa-car', type: 'error'}])
    }
  }
}
